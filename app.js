(() => {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const _t = (key, fallback = "") => window.I18N ? window.I18N.t(key, fallback) : (fallback || key);
  const _aptField = (apt, field) => window.I18N ? window.I18N.aptField(apt, field) : (apt?.[field] || "");

  // ---------- Data & Local Storage ----------
  const STORAGE_KEY_CUSTOM_APTS = "aptHunt.customApts";
  const STORAGE_KEY_WEIGHTS = "aptHunt.scoreWeights";
  const STORAGE_KEY_COMPARE_SELECTION = "aptHunt.compareSelection";

  function loadCustomApts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_APTS)) || [];
    } catch {
      return [];
    }
  }

  function saveCustomApts(list) {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_APTS, JSON.stringify(list));
    } catch { /* private mode */ }
  }

  function loadCompareSelection() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_COMPARE_SELECTION);
      if (!raw) return null;
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? new Set(arr) : null;
    } catch {
      return null;
    }
  }

  function saveCompareSelection(set) {
    try {
      localStorage.setItem(STORAGE_KEY_COMPARE_SELECTION, JSON.stringify([...set]));
    } catch { /* private mode */ }
  }

  const baseApts = (window.APARTMENTS || []).map((a) => ({ photos: [], layout: [], ...a }));
  const customApts = loadCustomApts();
  const APTS = [...baseApts, ...customApts];

  const sizeText = (a) => {
    if (!a.sqft) return "";
    const isZh = window.I18N && window.I18N.getLang() !== "en";
    const sqftUnit = isZh ? "呎" : "sq ft";
    const saleableWord = isZh ? "實用" : "saleable";
    const grossWord = isZh ? "建築" : "gross";
    return `${a.sqft} ${sqftUnit} ${saleableWord}` + (a.grossSqft ? ` (${a.grossSqft} ${grossWord})` : "");
  };

  const money = (n) => (n || n === 0) && !isNaN(n) ? (window.CURRENCY || "$") + Number(Math.round(n)).toLocaleString() : "";

  // ---------- App state ----------
  const visibleApts = () => APTS.filter((a) => a.enabled !== false || state.showRuledOut);
  const enabledApts = () => APTS.filter((a) => a.enabled !== false);
  const savedCompare = loadCompareSelection();
  const state = {
    tab: "photos",
    aptId: null,
    showRuledOut: false,
    selectedCompareIds: savedCompare && savedCompare.size > 0 ? savedCompare : new Set(enabledApts().map((a) => a.id))
  };
  const currentApt = () => APTS.find((a) => a.id === state.aptId) || visibleApts()[0] || null;

  function readHash() {
    const p = new URLSearchParams(location.hash.slice(1));
    if (p.get("tab")) state.tab = p.get("tab");
    if (p.get("apt")) state.aptId = p.get("apt");
  }
  function writeHash() {
    const p = new URLSearchParams();
    p.set("tab", state.tab);
    if (state.aptId) p.set("apt", state.aptId);
    history.replaceState(null, "", "#" + p.toString());
  }

  // Traced plans live in apartments/<id>/plan.js; load them before first render.
  function loadPlanFiles() {
    return Promise.all(APTS.filter((a) => a.planFile).map((a) => new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = a.planFile; s.onload = s.onerror = resolve;
      document.head.appendChild(s);
    })));
  }

  // ---------- Language Switcher ----------
  function initLangSwitch() {
    const btns = document.querySelectorAll(".lang-btn");
    const updateActive = () => {
      const current = window.I18N ? window.I18N.getLang() : "zh-HK";
      btns.forEach((b) => b.classList.toggle("on", b.dataset.lang === current));
    };
    btns.forEach((b) => {
      b.onclick = () => {
        if (window.I18N) {
          window.I18N.setLang(b.dataset.lang);
        }
      };
    });
    updateActive();
    if (window.I18N) {
      window.I18N.onLangChange(() => {
        updateActive();
        updateStaticLabels();
        mounted = null;
        render();
      });
    }
  }

  function updateStaticLabels() {
    const brand = $("#brand-title");
    if (brand) brand.textContent = _t("app.title", "Apartment Hunt");
    const tPhotos = $("#tab-btn-photos"); if (tPhotos) tPhotos.textContent = _t("nav.photos", "Photos");
    const tPlan = $("#tab-btn-plan"); if (tPlan) tPlan.textContent = _t("nav.plan", "Floor plan");
    const tComp = $("#tab-btn-compare"); if (tComp) tComp.textContent = _t("nav.compare", "Compare");

    const sTitle = $(".sidebar-title-row h2"); if (sTitle) sTitle.textContent = _t("sidebar.title", "Apartments");
    const sAdd = $("#btn-add-apt"); if (sAdd) sAdd.textContent = _t("sidebar.add", "+ Add");
    const sShow = $(".sidebar-head .check");
    if (sShow) {
      const chk = $("#show-ruled-out");
      sShow.innerHTML = "";
      sShow.appendChild(chk);
      sShow.appendChild(document.createTextNode(" " + _t("sidebar.showRuledOut", "Show ruled out")));
    }
    const sHint = $(".sidebar .hint");
    if (sHint) sHint.innerHTML = _t("sidebar.hint", "To add or rule out apartments, edit apartments.js or click + Add.");

    // Add dialog
    const dTitle = $("#add-dialog h3"); if (dTitle) dTitle.textContent = _t("dlg.addTitle", "Add / Import Apartment Listing");
    const dHint = $("#add-dialog .hint"); if (dHint) dHint.textContent = _t("dlg.addHint");
  }

  // ---------- Sidebar ----------
  function renderList() {
    const ul = $("#apt-list");
    ul.innerHTML = "";
    const list = visibleApts();
    if (!list.length) {
      ul.innerHTML = `<li class="meta">${_t("sidebar.empty", "No apartments enabled.")}</li>`;
      return;
    }
    const isZh = window.I18N && window.I18N.getLang() !== "en";
    for (const a of list) {
      const li = document.createElement("li");
      if (a.id === state.aptId) li.classList.add("on");
      if (a.enabled === false) li.classList.add("off");
      const bits = [
        money(a.rent) && money(a.rent) + (isZh ? "/月" : "/mo"),
        a.beds != null && `${a.beds} ${isZh ? "房" : "bd"}`,
        a.sqft && `${a.sqft} ${isZh ? "呎" : "sq ft"}`
      ].filter(Boolean);
      li.innerHTML = `<div class="name"></div><div class="meta">${bits.join(" · ")}</div>`;
      li.querySelector(".name").textContent = _aptField(a, "name") || a.name || a.id;
      if (a.enabled === false) {
        li.querySelector(".name").insertAdjacentHTML("beforeend", `<span class="tag">${_t("sidebar.ruledOutTag", "ruled out")}</span>`);
      }
      li.onclick = () => { selectApt(a.id); $("#sidebar").classList.remove("open"); };
      ul.appendChild(li);
    }
  }

  function selectApt(id) {
    state.aptId = id;
    render();
  }

  // ---------- Floor plan tab ----------
  let mounted = null;
  function renderPlan() {
    const apt = currentApt();
    const root = $("#plan-root");
    if (!apt) { root.innerHTML = `<div class="empty">No apartment selected.</div>`; mounted = null; return; }
    if (mounted === apt.id && root.firstChild) return;
    mounted = apt.id;
    Planner.mount(root, apt, { exportAll, importFile });
  }

  // ---------- Photos tab ----------
  function renderPhotos() {
    const apt = currentApt();
    const head = $("#apt-header");
    const gal = $("#gallery");
    gal.innerHTML = "";
    if (!apt) { head.innerHTML = `<div class="empty">No apartments yet. Add one with "+ Add" or in apartments.js.</div>`; return; }
    head.innerHTML = "";
    const h = document.createElement("h2");
    h.textContent = _aptField(apt, "name") || apt.name || apt.id;
    head.appendChild(h);
    const facts = document.createElement("div");
    facts.className = "facts";
    const add = (label, val) => {
      if (!val) return;
      const span = document.createElement("span");
      span.textContent = label ? label + " " : "";
      const b = document.createElement("b");
      b.textContent = val;
      span.appendChild(b);
      facts.appendChild(span);
    };
    const isZh = window.I18N && window.I18N.getLang() !== "en";
    add("", _aptField(apt, "address") || apt.address);
    add(_t("photos.rent", "Rent"), money(apt.rent) && money(apt.rent) + (isZh ? "/月" : "/mo"));
    add(_t("photos.beds", "Beds"), apt.beds != null ? String(apt.beds) : "");
    add(_t("photos.baths", "Baths"), apt.baths != null ? String(apt.baths) : "");
    add(_t("photos.size", "Size"), sizeText(apt));
    add(_t("photos.available", "Available"), _aptField(apt, "available") || apt.available);
    head.appendChild(facts);
    if (apt.url) {
      const a = document.createElement("a");
      a.href = apt.url; a.target = "_blank"; a.rel = "noopener";
      a.textContent = _t("photos.openListing", "Open listing ↗");
      head.appendChild(a);
    }
    const notesText = _aptField(apt, "notes") || apt.notes;
    if (notesText) {
      const p = document.createElement("p");
      p.className = "notes"; p.textContent = notesText;
      head.appendChild(p);
    }
    const pics = [...apt.photos];
    if (!pics.length) {
      gal.innerHTML = `<div class="empty">${_t("photos.noPhotos", "No photos yet for this apartment.")}</div>`;
      return;
    }
    pics.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src; img.loading = "lazy"; img.alt = `${apt.name} photo ${i + 1}`;
      img.onclick = () => openLightbox(pics, i);
      gal.appendChild(img);
    });
  }

  let lb = { pics: [], i: 0 };
  function openLightbox(pics, i) { lb = { pics, i }; showLb(); $("#lightbox").hidden = false; }
  function showLb() {
    $("#lb-img").src = lb.pics[lb.i];
    $("#lb-count").textContent = `${lb.i + 1} / ${lb.pics.length}`;
  }
  function stepLb(d) { lb.i = (lb.i + d + lb.pics.length) % lb.pics.length; showLb(); }
  $(".lb-close").onclick = () => ($("#lightbox").hidden = true);
  $(".lb-prev").onclick = () => stepLb(-1);
  $(".lb-next").onclick = () => stepLb(1);
  $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") $("#lightbox").hidden = true; });

  // ---------- Total Cost of Occupancy (TCO) Calculator ----------
  function calcTCO(a) {
    if (!a.rent) return null;
    const rent = Number(a.rent) || 0;
    const allIn = Number(a.allIn) || rent;
    const monthlyFees = Math.max(0, allIn - rent);

    const deposit = rent * 2;
    const agentFee = rent * 0.5;
    const annualRent = rent * 12;
    const stampDutyTenant = (annualRent * 0.0025) + 5;
    const firstMonthRent = rent;

    const upfrontCash = deposit + firstMonthRent + agentFee + stampDutyTenant;
    const year1Total = (allIn * 12) + agentFee + stampDutyTenant;

    return {
      monthlyRent: rent,
      monthlyFees,
      deposit,
      agentFee,
      stampDutyTenant,
      upfrontCash,
      year1Total
    };
  }

  // ---------- Compare & Scorecard Weighting ----------
  const DEFAULT_WEIGHTS = { budget: 40, transit: 35, space: 25 };
  function loadScoreWeights() {
    try {
      return { ...DEFAULT_WEIGHTS, ...(JSON.parse(localStorage.getItem(STORAGE_KEY_WEIGHTS)) || {}) };
    } catch {
      return DEFAULT_WEIGHTS;
    }
  }
  function saveScoreWeights(w) {
    try {
      localStorage.setItem(STORAGE_KEY_WEIGHTS, JSON.stringify(w));
    } catch { /* private mode */ }
  }

  // Factor scores
  const TIME_BANDS = [15, 22, 30, 40];
  const WALK_BANDS = [5, 8, 12, 16];
  const band = (m, bands) => m == null ? null : 5 - bands.filter((b) => m > b).length;
  const DEST = window.COMMUTE_TO || [];
  const W_MTR = 0.2, W_BUS = 0.1;

  function transportScore(a) {
    const t = a.transport;
    if (!t) return null;
    let sum = 0, w = 0;
    for (const d of DEST) { const sc = band(t[d.key]?.min, TIME_BANDS); if (sc != null) { sum += sc * d.weight; w += d.weight; } }
    const m = band(t.mtrWalk, WALK_BANDS), b = band(t.busWalk, WALK_BANDS);
    if (m != null) { sum += m * W_MTR; w += W_MTR; }
    if (b != null) { sum += b * W_BUS; w += W_BUS; }
    return w ? sum / w : null;
  }

  function budgetScore(a, allApts) {
    if (!a.rent) return null;
    const rents = allApts.map((x) => x.allIn || x.rent).filter(Boolean);
    if (!rents.length) return 3;
    const minR = Math.min(...rents), maxR = Math.max(...rents);
    if (minR === maxR) return 4;
    const r = a.allIn || a.rent;
    return Math.max(1, Math.min(5, 5 - ((r - minR) / (maxR - minR)) * 3.5));
  }

  function spaceScore(a, allApts) {
    if (!a.sqft) return null;
    const sqfts = allApts.map((x) => x.sqft).filter(Boolean);
    if (!sqfts.length) return 3;
    const minS = Math.min(...sqfts), maxS = Math.max(...sqfts);
    if (minS === maxS) return 4;
    return Math.max(1, Math.min(5, 2 + ((a.sqft - minS) / (maxS - minS)) * 3));
  }

  function calcCompositeScore(a, allApts, weights) {
    const b = budgetScore(a, allApts);
    const t = transportScore(a);
    const s = spaceScore(a, allApts);

    let sum = 0, totalW = 0;
    if (b != null && weights.budget > 0) { sum += b * weights.budget; totalW += weights.budget; }
    if (t != null && weights.transit > 0) { sum += t * weights.transit; totalW += weights.transit; }
    if (s != null && weights.space > 0) { sum += s * weights.space; totalW += weights.space; }

    return totalW > 0 ? sum / totalW : null;
  }

  const dots = (n) => `<span class="dots" title="${n}/5">${"●".repeat(n)}<i>${"●".repeat(5 - n)}</i></span>`;
  const scoreText = (x) => x == null ? "" : `<b class="score">${x.toFixed(1)}</b> / 5`;
  const mapsLink = (from, to) => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=transit`;
  const origin = (a) => `${_aptField(a, "name") || a.name}, ${_aptField(a, "address") || a.address}, Hong Kong`;

  function renderCompareControls(weights) {
    const ctrl = $("#compare-controls");
    if (!ctrl) return;
    const allEnabled = enabledApts();
    const isZh = window.I18N && window.I18N.getLang() !== "en";
    const selectedCount = allEnabled.filter((a) => state.selectedCompareIds.has(a.id)).length;

    ctrl.innerHTML = `
      <div class="compare-selector-card">
        <div class="compare-selector-header">
          <div class="compare-selector-title">
            <div style="display:flex;align-items:center;gap:8px">
              <h4>${_t("compare.selectTitle", "Select Properties to Compare")}</h4>
              <span class="compare-count-badge" id="compare-count-badge">${selectedCount} / ${allEnabled.length} ${_t("compare.selectedCount", "selected")}</span>
            </div>
            <div class="hint" style="margin:2px 0 0">${_t("compare.selectDesc", "Choose which apartments to include in the side-by-side comparison matrix and floor plan line-up.")}</div>
          </div>
          <div class="compare-selector-actions">
            <button id="compare-select-all" class="btn-xs">${_t("compare.selectAll", "Select All")}</button>
            <button id="compare-clear-all" class="btn-xs">${_t("compare.clearAll", "Deselect All")}</button>
          </div>
        </div>
        <div class="compare-chip-list">
          ${allEnabled.map((a) => {
            const isSel = state.selectedCompareIds.has(a.id);
            const price = money(a.rent) ? `${money(a.rent)}${isZh ? "/月" : "/mo"}` : "";
            return `
              <button type="button" class="compare-chip ${isSel ? "active" : ""}" data-id="${a.id}">
                <span class="chip-check">${isSel ? "✓" : "+"}</span>
                <span class="chip-name">${esc(_aptField(a, "name") || a.name || a.id)}</span>
                ${price ? `<span class="chip-price">${price}</span>` : ""}
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <div class="compare-ctrl-header">
        <div>
          <h3>${_t("compare.title", "Interactive Scorecard Weighting")}</h3>
          <div class="hint" style="margin:2px 0 0">${_t("compare.desc")}</div>
        </div>
        <button id="reset-weights-btn" class="btn" style="font-size:11px;padding:3px 8px">${_t("compare.reset", "Reset Weights")}</button>
      </div>
      <div class="slider-grid">
        <div class="slider-card">
          <div class="slider-label"><span>${_t("compare.wBudget", "💰 Budget / Rent")}</span><span class="slider-val" id="val-w-budget">${weights.budget}%</span></div>
          <input type="range" id="slider-w-budget" min="0" max="100" step="5" value="${weights.budget}">
          <div class="slider-desc">${_t("compare.wBudgetDesc")}</div>
        </div>
        <div class="slider-card">
          <div class="slider-label"><span>${_t("compare.wTransit", "🚇 Commute & Transit")}</span><span class="slider-val" id="val-w-transit">${weights.transit}%</span></div>
          <input type="range" id="slider-w-transit" min="0" max="100" step="5" value="${weights.transit}">
          <div class="slider-desc">${_t("compare.wTransitDesc")}</div>
        </div>
        <div class="slider-card">
          <div class="slider-label"><span>${_t("compare.wSpace", "📐 Living Space / Size")}</span><span class="slider-val" id="val-w-space">${weights.space}%</span></div>
          <input type="range" id="slider-w-space" min="0" max="100" step="5" value="${weights.space}">
          <div class="slider-desc">${_t("compare.wSpaceDesc")}</div>
        </div>
      </div>
    `;

    const updateCountBadge = () => {
      const badge = $("#compare-count-badge");
      if (badge) {
        const count = allEnabled.filter((a) => state.selectedCompareIds.has(a.id)).length;
        badge.textContent = `${count} / ${allEnabled.length} ${_t("compare.selectedCount", "selected")}`;
      }
    };

    ctrl.querySelectorAll(".compare-chip").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        if (state.selectedCompareIds.has(id)) {
          state.selectedCompareIds.delete(id);
          btn.classList.remove("active");
          btn.querySelector(".chip-check").textContent = "+";
        } else {
          state.selectedCompareIds.add(id);
          btn.classList.add("active");
          btn.querySelector(".chip-check").textContent = "✓";
        }
        saveCompareSelection(state.selectedCompareIds);
        updateCountBadge();
        renderCompareTable();
      };
    });

    const selAllBtn = $("#compare-select-all");
    if (selAllBtn) {
      selAllBtn.onclick = () => {
        allEnabled.forEach((a) => state.selectedCompareIds.add(a.id));
        saveCompareSelection(state.selectedCompareIds);
        ctrl.querySelectorAll(".compare-chip").forEach((btn) => {
          btn.classList.add("active");
          btn.querySelector(".chip-check").textContent = "✓";
        });
        updateCountBadge();
        renderCompareTable();
      };
    }

    const clearAllBtn = $("#compare-clear-all");
    if (clearAllBtn) {
      clearAllBtn.onclick = () => {
        state.selectedCompareIds.clear();
        saveCompareSelection(state.selectedCompareIds);
        ctrl.querySelectorAll(".compare-chip").forEach((btn) => {
          btn.classList.remove("active");
          btn.querySelector(".chip-check").textContent = "+";
        });
        updateCountBadge();
        renderCompareTable();
      };
    }

    const bindSlider = (id, key) => {
      const slider = $(`#slider-w-${id}`);
      slider.oninput = (e) => {
        weights[key] = +e.target.value;
        $(`#val-w-${id}`).textContent = weights[key] + "%";
        saveScoreWeights(weights);
        renderCompareTable();
      };
    };
    bindSlider("budget", "budget");
    bindSlider("transit", "transit");
    bindSlider("space", "space");

    $("#reset-weights-btn").onclick = () => {
      saveScoreWeights(DEFAULT_WEIGHTS);
      renderCompare();
    };
  }

  function esc(s) { return String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  async function renderCompare() {
    const weights = loadScoreWeights();
    renderCompareControls(weights);
    await renderCompareTable();
    renderRubric();
  }

  async function renderCompareTable() {
    const allEnabled = enabledApts();
    const apts = allEnabled.filter((a) => state.selectedCompareIds.has(a.id));
    const table = $("#compare-table");
    const plans = $("#compare-plans");

    if (!allEnabled.length) {
      table.innerHTML = "";
      plans.innerHTML = `<div class="empty">${_t("sidebar.empty", "No apartments enabled.")}</div>`;
      return;
    }

    if (!apts.length) {
      table.innerHTML = `<tbody><tr><td colspan="100%" class="empty compare-empty-state">
        <div style="font-size:32px;margin-bottom:8px">⚖️</div>
        <div style="font-weight:700;font-size:15px;margin-bottom:4px">${_t("compare.emptySelectionTitle", "No apartments selected for comparison")}</div>
        <div class="hint" style="margin-bottom:14px">${_t("compare.emptySelectionHint", "Click on one or more property badges above to compare them side-by-side.")}</div>
        <button id="compare-empty-select-all" class="btn primary">${_t("compare.selectAll", "Select All")}</button>
      </td></tr></tbody>`;
      const emptyBtn = $("#compare-empty-select-all");
      if (emptyBtn) {
        emptyBtn.onclick = () => {
          allEnabled.forEach((a) => state.selectedCompareIds.add(a.id));
          saveCompareSelection(state.selectedCompareIds);
          renderCompare();
        };
      }
      plans.innerHTML = `<div class="empty">${_t("compare.emptySelectionHint", "Click on one or more property badges above to view their floor plans.")}</div>`;
      return;
    }

    const weights = loadScoreWeights();
    const scores = apts.map((a) => calcCompositeScore(a, apts, weights));

    // Compute rank indices
    const rankMap = new Map();
    const sorted = apts.map((a, i) => ({ a, i, score: scores[i] || 0 })).sort((x, y) => y.score - x.score);
    sorted.forEach((item, r) => rankMap.set(item.a.id, r + 1));

    const isZh = window.I18N && window.I18N.getLang() !== "en";
    const rankBadges = apts.map((a) => {
      const r = rankMap.get(a.id);
      const cls = r === 1 ? "rank-1" : r === 2 ? "rank-2" : r === 3 ? "rank-3" : "rank-other";
      const medal = r === 1
        ? _t("compare.rank1", "🥇 #1 Match")
        : r === 2
        ? _t("compare.rank2", "🥈 #2 Match")
        : r === 3
        ? _t("compare.rank3", "🥉 #3 Match")
        : `#${r}`;
      return `<div class="rank-badge ${cls}">${medal}</div>`;
    });

    const COMPARE_ROWS = [
      [_t("row.rank", "Match Rank"), (a) => rankBadges[apts.indexOf(a)], true],
      [_t("row.composite", "Composite Score"), (a) => {
        const sc = calcCompositeScore(a, apts, weights);
        return sc ? `<div class="overall-score-cell">${sc.toFixed(2)} <span style="font-size:12px;color:var(--muted)">/ 5.0</span></div>` : "";
      }, true],
      [_t("row.photo", "Photo"), (a) => a.photos[0] ? `<img src="${encodeURI(a.photos[0])}" alt="">` : "", true],
      [_t("row.rent", "Rent"), (a) => money(a.rent) && money(a.rent) + (isZh ? "/月" : "/mo")],
      [_t("row.rentRange", "Rent ±10%"), (a) => a.rent ? `${money(Math.round(a.rent * 0.9))} – ${money(Math.round(a.rent * 1.1))}` : ""],
      [_t("row.fees", "Fees"), (a) => _aptField(a, "fees") || a.fees],
      [_t("row.allIn", "All-in / month"), (a) => money(a.allIn || a.rent)],
      [_t("row.bedsBaths", "Beds / baths"), (a) => [a.beds, a.baths].every((x) => x == null) ? "" : `${a.beds ?? "?"} ${isZh ? "房" : "bd"} / ${a.baths ?? "?"} ${isZh ? "衛" : "ba"}`],
      [_t("row.size", "Size"), (a) => sizeText(a)],
      [_t("row.building", "Building"), (a) => _aptField(a, "building") || a.building],
      [_t("row.floor", "Floor"), (a) => _aptField(a, "floor") || a.floor],
      [_t("row.perSqft", "Per sq ft"), (a) => a.rent && a.sqft ? (window.CURRENCY || "$") + (a.rent / a.sqft).toFixed(2) + (isZh ? " /呎" : " /sq ft") : ""],
      [_t("row.available", "Available"), (a) => _aptField(a, "available") || a.available],
      ["section", _t("sec.financials", "Financials & Total Cost of Occupancy (HK)")],
      [_t("row.upfront", "Upfront cash required"), (a) => {
        const t = calcTCO(a);
        if (!t) return "";
        const depLbl = isZh ? "按金 (2個月)" : "Deposit (2 mo)";
        const rentLbl = isZh ? "首月租金" : "1st Mo Rent";
        const agtLbl = isZh ? "地產代理佣金 (半個月)" : "Agent Fee (0.5 mo)";
        const stmLbl = isZh ? "稅務局租約印花稅" : "Stamp Duty";
        return `<b>${money(t.upfrontCash)}</b><div class="sub">${depLbl}: ${money(t.deposit)}<br>${rentLbl}: ${money(t.monthlyRent)}<br>${agtLbl}: ${money(t.agentFee)}<br>${stmLbl}: ${money(t.stampDutyTenant)}</div>`;
      }, true],
      [_t("row.tco", "1st Year Total Outlay (TCO)"), (a) => {
        const t = calcTCO(a);
        if (!t) return "";
        const rent12 = isZh ? `12個月全包租金 (${money((a.allIn || a.rent) * 12)})` : `12 mo all-in (${money((a.allIn || a.rent) * 12)})`;
        const agt = isZh ? `代理佣金 (${money(t.agentFee)})` : `Agent (${money(t.agentFee)})`;
        const stm = isZh ? `印花稅 (${money(t.stampDutyTenant)})` : `Stamp Duty (${money(t.stampDutyTenant)})`;
        return `<b>${money(t.year1Total)}</b><div class="sub">${rent12} + ${agt} + ${stm}</div>`;
      }, true],
      ["section", _t("sec.transport", "Transport (estimates)")],
      [_t("row.transScore", "Transport score"), (a) => scoreText(transportScore(a)), true],
      [_t("row.mtr", "MTR"), (a) => a.transport ? `${dots(band(a.transport.mtrWalk, WALK_BANDS))} ${esc(_aptField(a.transport, "mtr") || a.transport.mtr)}, ${a.transport.mtrWalk} ${isZh ? "分鐘步行" : "min walk"}` : "", true],
      [_t("row.bus", "Bus / minibus"), (a) => a.transport ? `${dots(band(a.transport.busWalk, WALK_BANDS))} ${esc(_aptField(a.transport, "bus") || a.transport.bus)}, ${a.transport.busWalk} ${isZh ? "分鐘步行" : "min walk"}` : "", true],
      ...DEST.map((d) => [
        _aptField(d, "label") || d.label,
        (a) => {
          const t = a.transport?.[d.key];
          if (!t) return "";
          const howText = _aptField(t, "how") || t.how;
          const mapText = isZh ? "於 Google Maps 查看路線 ↗" : "Check in Google Maps ↗";
          return `${dots(band(t.min, TIME_BANDS))} <b>~${t.min} ${isZh ? "分鐘" : "min"}</b><div class="sub">${esc(howText)}</div><a href="${mapsLink(origin(a), d.place)}" target="_blank" rel="noopener">${mapText}</a>`;
        },
        true
      ]),
      [isZh ? "主要特色與優點" : "Key Highlights", (a) => _aptField(a, "pros") || a.pros],
      [isZh ? "考量因素" : "Considerations", (a) => _aptField(a, "cons") || a.cons],
    ];

    const BEST = {
      [_t("row.composite", "Composite Score")]: (a) => calcCompositeScore(a, apts, weights),
      [_t("row.rent", "Rent")]: (a) => -a.rent,
      [_t("row.allIn", "All-in / month")]: (a) => a.allIn ? -a.allIn : -a.rent,
      [_t("row.upfront", "Upfront cash required")]: (a) => { const t = calcTCO(a); return t ? -t.upfrontCash : null; },
      [_t("row.tco", "1st Year Total Outlay (TCO)")]: (a) => { const t = calcTCO(a); return t ? -t.year1Total : null; },
      [_t("row.size", "Size")]: (a) => a.sqft,
      [_t("row.perSqft", "Per sq ft")]: (a) => a.rent && a.sqft ? -(a.rent / a.sqft) : null,
      [_t("row.transScore", "Transport score")]: transportScore,
      [_t("row.mtr", "MTR")]: (a) => a.transport ? -a.transport.mtrWalk : null,
      ...Object.fromEntries(DEST.map((d) => [_aptField(d, "label") || d.label, (a) => a.transport?.[d.key] ? -a.transport[d.key].min : null])),
    };

    let html = `<thead><tr><th></th>${apts.map((a, i) => `<th>${rankBadges[i]}<br>${esc(_aptField(a, "name") || a.name || a.id)}</th>`).join("")}</tr></thead><tbody>`;
    for (const [label, fn, raw] of COMPARE_ROWS) {
      if (label === "section") { html += `<tr class="row-section"><th colspan="${apts.length + 1}">${esc(fn)}</th></tr>`; continue; }
      const vals = apts.map(fn);
      if (vals.every((v) => !v)) continue;
      let bestIdx = -1;
      if (BEST[label] && apts.length > 1) {
        const scList = apts.map((a) => { const v = BEST[label](a); return v == null || isNaN(v) ? null : v; });
        const max = Math.max(...scList.filter((v) => v != null));
        if (scList.filter((v) => v === max).length === 1) bestIdx = scList.indexOf(max);
      }
      html += `<tr><th>${label}</th>${vals.map((v, i) => `<td class="${i === bestIdx ? "best" : ""}">${raw ? v : esc(v)}</td>`).join("")}</tr>`;
    }
    table.innerHTML = html + "</tbody>";

    // Static drawings
    const K = 0.42;
    plans.innerHTML = `<div class="scale-bar" style="width:100%"><span class="bar" style="width:${100 * K}px"></span> 1 m</div>`;
    for (const a of apts) {
      const fig = document.createElement("figure");
      const cap = document.createElement("figcaption");
      cap.textContent = _aptField(a, "name") || a.name || a.id;
      const size = !window.PLANS[a.id] && a.floorPlan ? await loadImageSize(a.floorPlan) : null;
      const svgEl = Planner.renderStatic(a, size, K);
      if (!svgEl) {
        const d = document.createElement("div");
        d.className = "hint";
        d.style.width = "180px";
        d.textContent = !a.floorPlan
          ? (isZh ? "暫無平面圖則。" : "No floor plan yet.")
          : !size
          ? (isZh ? "圖則載入中。" : "Floor plan didn't load.")
          : (isZh ? "尚未校準比例。請前往「平面圖」分頁點擊「校準比例」。" : "Scale not set yet. Open Floor plan and use Set scale.");
        fig.appendChild(d);
      } else fig.appendChild(svgEl);
      fig.appendChild(cap);
      plans.appendChild(fig);
    }
  }

  function renderRubric() {
    const isZh = window.I18N && window.I18N.getLang() !== "en";
    const rng = (bands, unit) => [`≤${bands[0]} ${unit}`, `${bands[0] + 1}–${bands[1]}`, `${bands[1] + 1}–${bands[2]}`, `${bands[2] + 1}–${bands[3]}`, `>${bands[3]} ${unit}`];
    const unitMin = isZh ? "分" : "min";
    const t = rng(TIME_BANDS, unitMin), w = rng(WALK_BANDS, unitMin);
    const weights = [...DEST.map((d) => `${_aptField(d, "label") || d.label} ${Math.round(d.weight * 100)}%`), `${isZh ? "港鐵步行" : "MTR walk"} ${W_MTR * 100}%`, `${isZh ? "巴士步行" : "bus walk"} ${W_BUS * 100}%`].join(", ");

    if (isZh) {
      $("#rubric").innerHTML = `<summary>評分計算說明與依據</summary>
        <h4>綜合匹配得分 (Composite Score)</h4>
        <p>依據您上方自訂的權重比例（預算、交通、實用空間），即時計算所有候選樓盤的綜合適配指數並進行排名。</p>
        <h4>首年居住總成本 (Total Cost of Occupancy - TCO)</h4>
        <p>嚴格依循香港住宅租賃真實市場常規：2個月按金 + 1個月首期租金 + 0.5個月地產代理佣金 + 香港稅務局標準租約印花稅（一年期租約：年租金之0.25% + HK$5副本文本）。</p>
        <h4>交通通達度得分 (Transport Score)</h4>
        <p>依據平日早晨尖峰時段各路段耗時換算為1至5分等級，權重配置：${esc(weights)}。</p>
        <table class="rubric-table"><thead><tr><th>評級</th><th>公共交通門到門總時間</th><th>步行至港鐵或巴士站</th></tr></thead><tbody>
        ${[0, 1, 2, 3, 4].map((i) => `<tr><td>${dots(5 - i)}</td><td>${t[i]}</td><td>${w[i]}</td></tr>`).join("")}
        </tbody></table>
        <p class="hint">時間為平日早晨通勤預估值（包含步行、候車與搭乘）。點擊表格內 Google Maps 連結可查看即時路況。</p>`;
    } else {
      $("#rubric").innerHTML = `<summary>How the scores work</summary>
        <h4>Composite Match Score</h4>
        <p>Uses your customized weights above (Budget, Transit, Space) to calculate overall match scores and rank all candidate apartments side-by-side.</p>
        <h4>Total Cost of Occupancy (TCO)</h4>
        <p>Reflects real Hong Kong tenancy market rules: 2 months security deposit + 1st month rent + 0.5 month agent commission + standard IRD lease stamp duty (0.25% of annual rent + HK$5 counterpart).</p>
        <h4>Transport score</h4>
        <p>Each factor gets 1 to 5, then a weighted average: ${esc(weights)}.</p>
        <table class="rubric-table"><thead><tr><th>Score</th><th>Door-to-door by public transport</th><th>Walk to MTR or bus stop</th></tr></thead><tbody>
        ${[0, 1, 2, 3, 4].map((i) => `<tr><td>${dots(5 - i)}</td><td>${t[i]}</td><td>${w[i]}</td></tr>`).join("")}
        </tbody></table>
        <p class="hint">Times are estimates for a weekday morning (walk + wait + ride). Use the Google Maps links in each cell to verify live conditions.</p>`;
    }
  }

  const imgSize = {};
  function loadImageSize(src) {
    if (imgSize[src]) return Promise.resolve(imgSize[src]);
    return new Promise((resolve) => {
      const im = new Image();
      im.onload = () => resolve((imgSize[src] = { w: im.naturalWidth, h: im.naturalHeight }));
      im.onerror = () => resolve(null);
      im.src = src;
    });
  }

  // ---------- Add Listing Dialog ----------
  function initAddDialog() {
    const btn = $("#btn-add-apt");
    const dlg = $("#add-dialog");
    const form = $("#add-apt-form");
    const cancel = $("#add-cancel");
    if (!btn || !dlg || !form) return;

    btn.onclick = () => dlg.showModal();
    cancel.onclick = () => dlg.close();

    form.onsubmit = (e) => {
      e.preventDefault();
      const name = $("#add-name").value.trim();
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || ("apt-" + Date.now());
      const rent = Number($("#add-rent").value) || 0;
      const feesStr = $("#add-fees").value.trim();
      let allIn = rent;
      const feeMatch = feesStr.match(/\d[\d,]*/);
      if (feeMatch) allIn += Number(feeMatch[0].replace(/,/g, ""));

      const photosRaw = $("#add-photos").value.split(/[\n,]+/).map((s) => s.trim()).filter((s) => s.startsWith("http") || s.startsWith("apartments/"));
      const mtrVal = $("#add-mtr").value.trim();
      let mtrName = mtrVal, mtrWalk = 5;
      if (mtrVal.includes(",")) {
        const parts = mtrVal.split(",");
        mtrName = parts[0].trim();
        mtrWalk = Number(parts[1].trim()) || 5;
      }

      const newApt = {
        id: slug,
        enabled: true,
        name,
        building: $("#add-building").value.trim() || name,
        address: $("#add-address").value.trim(),
        rent,
        fees: feesStr || "Included",
        allIn,
        beds: $("#add-beds").value ? Number($("#add-beds").value) : null,
        baths: $("#add-baths").value ? Number($("#add-baths").value) : 1,
        sqft: $("#add-sqft").value ? Number($("#add-sqft").value) : null,
        url: $("#add-url").value.trim(),
        photos: photosRaw,
        floorPlan: $("#add-floorplan").value.trim(),
        notes: $("#add-notes").value.trim(),
        transport: {
          mtr: mtrName || "Sai Ying Pun",
          mtrWalk,
          bus: "Nearby buses and minibuses",
          busWalk: 2,
          work: { min: 20, how: "MTR / bus to Central" },
          parents: { min: 35, how: "Public transit" }
        },
        layout: []
      };

      APTS.push(newApt);
      const custom = loadCustomApts();
      custom.push(newApt);
      saveCustomApts(custom);

      dlg.close();
      form.reset();
      selectApt(newApt.id);
    };
  }

  // ---------- Export / Import ----------
  function exportData() {
    const out = {};
    for (const a of APTS) {
      const s = Planner.loadSaved(a.id);
      if (s.items || s.calibration) out[a.id] = { ...(s.calibration ? { calibration: s.calibration } : {}), ...(s.items ? { layout: s.items } : {}) };
    }
    return JSON.stringify(out, null, 2);
  }
  function exportAll() { $("#export-text").value = exportData(); $("#export-dialog").showModal(); }
  $("#export-close").onclick = () => $("#export-dialog").close();
  $("#export-copy").onclick = () => navigator.clipboard.writeText($("#export-text").value);
  $("#export-download").onclick = () => {
    const blob = new Blob([$("#export-text").value], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "apartment-layouts.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  async function importFile(f) {
    if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      for (const [id, v] of Object.entries(data)) {
        const s = Planner.loadSaved(id);
        if (v.calibration) s.calibration = v.calibration;
        if (v.layout) s.items = v.layout;
        Planner.storeSaved(id, s);
      }
      mounted = null; render();
    } catch { alert("That file isn't a valid export."); }
  }

  // ---------- Tabs & Main Render ----------
  function render() {
    if (!currentApt() || !visibleApts().includes(currentApt())) {
      state.aptId = (visibleApts()[0] || {}).id || null;
    }
    document.querySelectorAll(".tabs button").forEach((b) => b.classList.toggle("on", b.dataset.tab === state.tab));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.toggle("on", p.id === "tab-" + state.tab));
    updateStaticLabels();
    renderList();
    writeHash();
    if (state.tab === "photos") renderPhotos();
    if (state.tab === "plan") renderPlan();
    if (state.tab === "compare") renderCompare();
  }

  // ---------- Wiring ----------
  document.querySelectorAll(".tabs button").forEach((b) => (b.onclick = () => { state.tab = b.dataset.tab; render(); }));
  $("#show-ruled-out").onchange = (e) => { state.showRuledOut = e.target.checked; render(); };
  $("#menu-btn").onclick = () => $("#sidebar").classList.toggle("open");

  initLangSwitch();
  initAddDialog();
  readHash();
  loadPlanFiles().then(render);
})();
