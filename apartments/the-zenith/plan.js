// The Zenith (尚翹峰), Block 3 Unit D (2 bedrooms, 498 sq ft saleable).
// Units are in centimetres.
window.PLANS = window.PLANS || {};
window.PLANS["the-zenith"] = {
  "source": "Traced from The Zenith (尚翹峰 3座D室) architectural floor plan, 498 sq ft saleable, Wan Chai. High ceiling with balcony.",
  "ceiling": 280,
  "defaultPreset": "standard",
  "presetNames": {
    "standard": "Master Bed + Living & Dining",
    "wfh": "Bed + Home Office Setup",
    "empty": "Empty Flat"
  },
  "presets": {
    "standard": [
      ["bed-queen", 160, 160, 152, 190, 0],
      ["nightstand", 65, 120, 45, 40, 0],
      ["nightstand", 255, 120, 45, 40, 0],
      ["wardrobe", 160, 310, 120, 60, 180],
      ["bed-single", 390, 160, 90, 190, 0],
      ["sofa3", 580, 420, 210, 90, 180],
      ["coffee", 580, 330, 100, 55, 0],
      ["tv", 580, 210, 160, 40, 0],
      ["rug", 580, 340, 200, 140, 0],
      ["dining4", 360, 480, 120, 75, 90],
      ["chair", 310, 450, 45, 50, 90],
      ["chair", 310, 510, 45, 50, 90],
      ["chair", 410, 450, 45, 50, 270],
      ["chair", 410, 510, 45, 50, 270],
      ["shoe", 490, 630, 80, 30, 0]
    ],
    "wfh": [
      ["bed-queen", 160, 160, 152, 190, 0],
      ["nightstand", 65, 120, 45, 40, 0],
      ["wardrobe", 160, 310, 120, 60, 180],
      ["desk", 390, 160, 120, 60, 0],
      ["officechair", 390, 215, 60, 60, 180],
      ["bookshelf", 450, 280, 80, 30, 270],
      ["sofa3", 580, 420, 210, 90, 180],
      ["coffee", 580, 330, 100, 55, 0],
      ["tv", 580, 210, 160, 40, 0],
      ["rug", 580, 340, 200, 140, 0],
      ["dining4", 360, 480, 120, 75, 90],
      ["shoe", 490, 630, 80, 30, 0]
    ],
    "empty": []
  },
  "rooms": [
    { "n": "Master Bed", "x": 160, "y": 200, "dim": "2.8 × 2.6 m" },
    { "n": "Bedroom 2", "x": 390, "y": 200, "dim": "2.3 × 2.4 m" },
    { "n": "Living Room", "x": 580, "y": 340, "dim": "3.2 × 3.6 m" },
    { "n": "Dining Area", "x": 360, "y": 480, "dim": "2.4 × 2.6 m" },
    { "n": "Kitchen", "x": 160, "y": 500, "dim": "2.1 × 2.2 m" },
    { "n": "Bathroom", "x": 150, "y": 380, "dim": "1.8 × 2.0 m" },
    { "n": "Balcony", "x": 580, "y": 60, "dim": "2.2 × 1.0 m" }
  ],
  "notes": [
    { "x": 480, "y": 660, "text": "front door" },
    { "x": 580, "y": 20, "text": "facing Queen's Road East (open city view)" }
  ],
  "bounds": [-20, -10, 760, 690],
  "floors": [
    { "r": [20, 80, 280, 260], "kind": "wood" },
    { "r": [300, 80, 180, 260], "kind": "wood" },
    { "r": [480, 120, 240, 460], "kind": "wood" },
    { "r": [280, 380, 200, 240], "kind": "wood" },
    { "r": [20, 440, 240, 200], "kind": "kitchen" },
    { "r": [20, 340, 240, 100], "kind": "bath" },
    { "r": [490, 20, 220, 100], "kind": "tile" }
  ],
  "walls": [
    { "a": [20, 80], "b": [480, 80], "t": 15, "o": [{ "k": "win", "s": 50, "e": 230 }, { "k": "win", "s": 330, "e": 450 }] },
    { "a": [480, 80], "b": [480, 20], "t": 15 },
    { "a": [480, 20], "b": [720, 20], "t": 15, "o": [{ "k": "win", "s": 30, "e": 210 }] },
    { "a": [720, 20], "b": [720, 580], "t": 20 },
    { "a": [720, 580], "b": [440, 580], "t": 18 },
    { "a": [440, 580], "b": [440, 640], "t": 18, "o": [{ "k": "door", "side": 1, "h": "e", "s": 10, "e": 55 }] },
    { "a": [440, 640], "b": [20, 640], "t": 20 },
    { "a": [20, 640], "b": [20, 80], "t": 20, "o": [{ "k": "win", "frost": 1, "s": 270, "e": 330 }] },
    { "a": [300, 80], "b": [300, 340], "t": 12, "o": [{ "k": "door", "side": -1, "h": "s", "s": 180, "e": 250 }] },
    { "a": [20, 340], "b": [300, 340], "t": 12, "o": [{ "k": "door", "side": 1, "h": "s", "s": 210, "e": 280 }] },
    { "a": [20, 440], "b": [260, 440], "t": 12, "o": [{ "k": "door", "side": 1, "h": "e", "s": 170, "e": 240 }] },
    { "a": [480, 80], "b": [480, 380], "t": 12, "o": [{ "k": "door", "side": 1, "h": "s", "s": 150, "e": 220 }] }
  ],
  "fixtures": [
    { "h": 90, "label": "Hob", "kind": "hob", "r": [30, 460, 50, 120] },
    { "h": 90, "label": "Sink", "kind": "sink", "r": [30, 580, 100, 45] },
    { "h": 55, "color": "#f4f4f2", "label": "Shower", "round": 1, "r": [30, 350, 80, 75] },
    { "h": 40, "color": "#f7f7f5", "label": "WC", "round": 1, "r": [130, 350, 45, 60] },
    { "h": 85, "label": "Basin", "kind": "sink", "r": [195, 350, 50, 55] }
  ]
};
