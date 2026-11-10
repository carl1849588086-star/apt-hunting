// 15 Western Street (西邊街15號), Middle Floor (Studio, 213 sq ft saleable).
// Units are in centimetres.
window.PLANS = window.PLANS || {};
window.PLANS["15-western-street"] = {
  "source": "Traced from 15 Western Street (西邊街15號 中層開放式) architectural floor plan, 213 sq ft saleable, Sai Ying Pun. Vanke 2021 new residence.",
  "ceiling": 285,
  "defaultPreset": "studio",
  "presetNames": {
    "studio": "Studio Double Bed + Desk",
    "sofa": "Sofa Bed + Coffee Table",
    "empty": "Empty Flat"
  },
  "presets": {
    "studio": [
      ["bed-double", 130, 160, 135, 190, 0],
      ["nightstand", 40, 120, 45, 40, 0],
      ["wardrobe", 130, 310, 120, 60, 180],
      ["desk", 310, 150, 120, 60, 0],
      ["officechair", 310, 205, 60, 60, 180],
      ["shoe", 320, 430, 80, 30, 0]
    ],
    "sofa": [
      ["sofabed", 130, 180, 190, 90, 0],
      ["coffee", 130, 270, 100, 55, 0],
      ["tv", 310, 270, 120, 40, 270],
      ["wardrobe", 130, 350, 120, 60, 180],
      ["desk", 310, 150, 120, 60, 0],
      ["shoe", 320, 430, 80, 30, 0]
    ],
    "empty": []
  },
  "rooms": [
    { "n": "Studio Living", "x": 210, "y": 210, "dim": "3.2 × 3.5 m" },
    { "n": "Kitchenette", "x": 310, "y": 360, "dim": "1.8 × 1.5 m" },
    { "n": "Bathroom", "x": 100, "y": 400, "dim": "1.6 × 1.8 m" },
    { "n": "Balcony", "x": 210, "y": 40, "dim": "2.0 × 0.9 m" }
  ],
  "notes": [
    { "x": 320, "y": 460, "text": "front door" },
    { "x": 210, "y": 15, "text": "facing Western Street (open city view)" }
  ],
  "bounds": [-20, -10, 440, 500],
  "floors": [
    { "r": [20, 60, 380, 320], "kind": "wood" },
    { "r": [220, 320, 180, 140], "kind": "tile" },
    { "r": [20, 320, 180, 140], "kind": "bath" },
    { "r": [110, 10, 200, 50], "kind": "tile" }
  ],
  "walls": [
    { "a": [20, 60], "b": [110, 60], "t": 15, "o": [{ "k": "win", "s": 20, "e": 80 }] },
    { "a": [110, 60], "b": [110, 10], "t": 15 },
    { "a": [110, 10], "b": [310, 10], "t": 15, "o": [{ "k": "win", "s": 20, "e": 180 }] },
    { "a": [310, 10], "b": [310, 60], "t": 15 },
    { "a": [310, 60], "b": [400, 60], "t": 15, "o": [{ "k": "win", "s": 20, "e": 80 }] },
    { "a": [400, 60], "b": [400, 460], "t": 20 },
    { "a": [400, 460], "b": [260, 460], "t": 18, "o": [{ "k": "door", "side": 1, "h": "e", "s": 10, "e": 60 }] },
    { "a": [260, 460], "b": [20, 460], "t": 20 },
    { "a": [20, 460], "b": [20, 60], "t": 20 },
    { "a": [200, 320], "b": [200, 460], "t": 12, "o": [{ "k": "door", "side": 1, "h": "s", "s": 20, "e": 85 }] }
  ],
  "fixtures": [
    { "h": 90, "label": "Hob", "kind": "hob", "r": [240, 330, 45, 90] },
    { "h": 90, "label": "Sink", "kind": "sink", "r": [310, 330, 80, 40] },
    { "h": 55, "color": "#f4f4f2", "label": "Shower", "round": 1, "r": [30, 330, 75, 70] },
    { "h": 40, "color": "#f7f7f5", "label": "WC", "round": 1, "r": [120, 330, 45, 55] },
    { "h": 85, "label": "Basin", "kind": "sink", "r": [130, 400, 50, 45] }
  ]
};
