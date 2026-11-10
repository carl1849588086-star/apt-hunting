// One Artlane (藝里坊·1號), High Floor Unit A (2 bedrooms, 421 sq ft saleable).
// Units are in centimetres.
window.PLANS = window.PLANS || {};
window.PLANS["one-artlane"] = {
  "source": "Traced from One Artlane (藝里坊·1號 高層A室) architectural floor plan, 421 sq ft saleable, Sai Ying Pun. Urban art district, smart modern residence.",
  "ceiling": 280,
  "defaultPreset": "standard",
  "presetNames": {
    "standard": "Queen Bed + 2nd Bedroom",
    "wfh": "Bedroom + Studio Office",
    "empty": "Empty Flat"
  },
  "presets": {
    "standard": [
      ["bed-queen", 150, 150, 152, 190, 0],
      ["nightstand", 60, 110, 45, 40, 0],
      ["wardrobe", 150, 290, 120, 60, 180],
      ["bed-single", 360, 150, 90, 190, 0],
      ["sofa3", 550, 380, 210, 90, 180],
      ["coffee", 550, 290, 100, 55, 0],
      ["tv", 550, 180, 160, 40, 0],
      ["rug", 550, 300, 200, 140, 0],
      ["dining4", 360, 440, 120, 75, 90],
      ["shoe", 460, 560, 80, 30, 0]
    ],
    "wfh": [
      ["bed-queen", 150, 150, 152, 190, 0],
      ["wardrobe", 150, 290, 120, 60, 180],
      ["desk", 360, 150, 120, 60, 0],
      ["officechair", 360, 205, 60, 60, 180],
      ["bookshelf", 420, 260, 80, 30, 270],
      ["sofa3", 550, 380, 210, 90, 180],
      ["coffee", 550, 290, 100, 55, 0],
      ["tv", 550, 180, 160, 40, 0],
      ["dining4", 360, 440, 120, 75, 90],
      ["shoe", 460, 560, 80, 30, 0]
    ],
    "empty": []
  },
  "rooms": [
    { "n": "Master Bed", "x": 150, "y": 180, "dim": "2.6 × 2.6 m" },
    { "n": "Bedroom 2", "x": 360, "y": 180, "dim": "2.2 × 2.3 m" },
    { "n": "Living Room", "x": 550, "y": 300, "dim": "3.0 × 3.4 m" },
    { "n": "Open Kitchen", "x": 360, "y": 450, "dim": "2.4 × 2.2 m" },
    { "n": "Bathroom", "x": 150, "y": 380, "dim": "1.8 × 2.0 m" },
    { "n": "Balcony", "x": 550, "y": 50, "dim": "2.0 × 1.0 m" }
  ],
  "notes": [
    { "x": 460, "y": 590, "text": "front door" },
    { "x": 550, "y": 20, "text": "facing Artlane mural street & Victoria Harbour" }
  ],
  "bounds": [-20, -10, 720, 620],
  "floors": [
    { "r": [20, 70, 260, 260], "kind": "wood" },
    { "r": [280, 70, 180, 230], "kind": "wood" },
    { "r": [460, 110, 220, 420], "kind": "wood" },
    { "r": [260, 300, 200, 230], "kind": "wood" },
    { "r": [20, 330, 240, 200], "kind": "bath" },
    { "r": [470, 20, 200, 90], "kind": "tile" }
  ],
  "walls": [
    { "a": [20, 70], "b": [460, 70], "t": 15, "o": [{ "k": "win", "s": 40, "e": 220 }, { "k": "win", "s": 300, "e": 430 }] },
    { "a": [460, 70], "b": [460, 20], "t": 15 },
    { "a": [460, 20], "b": [680, 20], "t": 15, "o": [{ "k": "win", "s": 20, "e": 190 }] },
    { "a": [680, 20], "b": [680, 530], "t": 20 },
    { "a": [680, 530], "b": [420, 530], "t": 18 },
    { "a": [420, 530], "b": [420, 580], "t": 18, "o": [{ "k": "door", "side": 1, "h": "e", "s": 10, "e": 45 }] },
    { "a": [420, 580], "b": [20, 580], "t": 20 },
    { "a": [20, 580], "b": [20, 70], "t": 20, "o": [{ "k": "win", "frost": 1, "s": 270, "e": 330 }] },
    { "a": [280, 70], "b": [280, 300], "t": 12, "o": [{ "k": "door", "side": -1, "h": "s", "s": 160, "e": 225 }] },
    { "a": [20, 330], "b": [260, 330], "t": 12, "o": [{ "k": "door", "side": 1, "h": "s", "s": 170, "e": 235 }] },
    { "a": [460, 70], "b": [460, 340], "t": 12, "o": [{ "k": "door", "side": 1, "h": "s", "s": 140, "e": 205 }] }
  ],
  "fixtures": [
    { "h": 90, "label": "Hob", "kind": "hob", "r": [270, 320, 45, 110] },
    { "h": 90, "label": "Sink", "kind": "sink", "r": [270, 440, 100, 40] },
    { "h": 55, "color": "#f4f4f2", "label": "Shower", "round": 1, "r": [30, 340, 75, 75] },
    { "h": 40, "color": "#f7f7f5", "label": "WC", "round": 1, "r": [120, 340, 45, 60] },
    { "h": 85, "label": "Basin", "kind": "sink", "r": [180, 340, 50, 55] }
  ]
};
