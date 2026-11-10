// Island Crest (縉城峰), Tower 1 Mid Floor (2 bedrooms, 544 sq ft saleable).
// Units are in centimetres.
window.PLANS = window.PLANS || {};
window.PLANS["island-crest"] = {
  "source": "Traced from Island Crest (縉城峰 1座) architectural floor plan, 544 sq ft saleable, Sai Ying Pun. Luxury Kerry residence with clubhouse and pool.",
  "ceiling": 285,
  "defaultPreset": "standard",
  "presetNames": {
    "standard": "Master Bed + Living & Dining",
    "two": "Two Bedrooms + Dining",
    "empty": "Empty Flat"
  },
  "presets": {
    "standard": [
      ["bed-queen", 175, 170, 152, 190, 0],
      ["nightstand", 70, 120, 45, 40, 0],
      ["nightstand", 280, 120, 45, 40, 0],
      ["wardrobe", 175, 330, 120, 60, 180],
      ["bed-single", 420, 160, 90, 190, 0],
      ["sofa3", 640, 420, 210, 90, 180],
      ["coffee", 640, 320, 100, 55, 0],
      ["tv", 640, 200, 160, 40, 0],
      ["rug", 640, 330, 200, 140, 0],
      ["dining4", 420, 480, 120, 75, 90],
      ["chair", 370, 450, 45, 50, 90],
      ["chair", 370, 510, 45, 50, 90],
      ["chair", 470, 450, 45, 50, 270],
      ["chair", 470, 510, 45, 50, 270],
      ["shoe", 540, 640, 80, 30, 0]
    ],
    "two": [
      ["bed-queen", 175, 170, 152, 190, 0],
      ["wardrobe", 175, 330, 120, 60, 180],
      ["bed-double", 420, 170, 135, 190, 0],
      ["sofa3", 640, 420, 210, 90, 180],
      ["coffee", 640, 320, 100, 55, 0],
      ["tv", 640, 200, 160, 40, 0],
      ["dining4", 420, 480, 120, 75, 90],
      ["shoe", 540, 640, 80, 30, 0]
    ],
    "empty": []
  },
  "rooms": [
    { "n": "Master Bed", "x": 175, "y": 210, "dim": "3.1 × 2.8 m" },
    { "n": "Bedroom 2", "x": 420, "y": 210, "dim": "2.4 × 2.5 m" },
    { "n": "Living Room", "x": 640, "y": 330, "dim": "3.4 × 4.8 m" },
    { "n": "Dining Area", "x": 420, "y": 480, "dim": "2.4 × 2.6 m" },
    { "n": "Kitchen", "x": 175, "y": 520, "dim": "2.4 × 2.2 m" },
    { "n": "Bathroom", "x": 175, "y": 390, "dim": "2.0 × 2.2 m" },
    { "n": "Balcony", "x": 640, "y": 50, "dim": "2.4 × 1.1 m" }
  ],
  "notes": [
    { "x": 540, "y": 660, "text": "front door" },
    { "x": 640, "y": 20, "text": "facing Victoria Harbour & open city" }
  ],
  "bounds": [-20, -10, 820, 700],
  "floors": [
    { "r": [20, 80, 310, 280], "kind": "wood" },
    { "r": [330, 80, 190, 280], "kind": "wood" },
    { "r": [520, 120, 260, 480], "kind": "wood" },
    { "r": [330, 360, 190, 260], "kind": "wood" },
    { "r": [20, 460, 280, 200], "kind": "kitchen" },
    { "r": [20, 360, 280, 100], "kind": "bath" },
    { "r": [530, 10, 240, 110], "kind": "tile" }
  ],
  "walls": [
    { "a": [20, 80], "b": [520, 80], "t": 15, "o": [{ "k": "win", "s": 50, "e": 260 }, { "k": "win", "s": 360, "e": 490 }] },
    { "a": [520, 80], "b": [520, 10], "t": 15 },
    { "a": [520, 10], "b": [780, 10], "t": 15, "o": [{ "k": "win", "s": 30, "e": 230 }] },
    { "a": [780, 10], "b": [780, 600], "t": 20 },
    { "a": [780, 600], "b": [490, 600], "t": 18 },
    { "a": [490, 600], "b": [490, 660], "t": 18, "o": [{ "k": "door", "side": 1, "h": "e", "s": 10, "e": 55 }] },
    { "a": [490, 660], "b": [20, 660], "t": 20 },
    { "a": [20, 660], "b": [20, 80], "t": 20, "o": [{ "k": "win", "frost": 1, "s": 290, "e": 350 }] },
    { "a": [330, 80], "b": [330, 360], "t": 12, "o": [{ "k": "door", "side": -1, "h": "s", "s": 200, "e": 270 }] },
    { "a": [20, 360], "b": [330, 360], "t": 12, "o": [{ "k": "door", "side": 1, "h": "s", "s": 230, "e": 300 }] },
    { "a": [20, 460], "b": [300, 460], "t": 12, "o": [{ "k": "door", "side": 1, "h": "e", "s": 200, "e": 270 }] },
    { "a": [520, 80], "b": [520, 380], "t": 12, "o": [{ "k": "door", "side": 1, "h": "s", "s": 170, "e": 240 }] }
  ],
  "fixtures": [
    { "h": 90, "label": "Hob", "kind": "hob", "r": [30, 480, 50, 130] },
    { "h": 90, "label": "Sink", "kind": "sink", "r": [30, 610, 120, 45] },
    { "h": 55, "color": "#f4f4f2", "label": "Bathtub", "round": 1, "r": [30, 370, 90, 80] },
    { "h": 40, "color": "#f7f7f5", "label": "WC", "round": 1, "r": [140, 370, 45, 60] },
    { "h": 85, "label": "Basin", "kind": "sink", "r": [210, 370, 55, 55] }
  ]
};
