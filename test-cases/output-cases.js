export const passingCases = [
  [
    { color: "#f2f2f2", intensity: 0.3 },
    null,
    `box-shadow: 20px 20px 60px #a9a9a9, -20px -20px 60px #ffffff;`,
  ],
  [
    { shape: "pressed", lightSource: "topRight", color: "#6722ff" },
    null,
    `box-shadow: inset -20px 20px 60px #581dd9, inset 20px -20px 60px #7627ff;`,
  ],
  [
    { shape: "concave", lightSource: "bottomRight", color: "#6722ff" },
    null,
    `background: linear-gradient(315deg, #6e24ff, #5d1fe6); box-shadow: -20px -20px 60px #581dd9, 20px 20px 60px #7627ff;`,
  ],
  [{}, null, `box-shadow: 20px 20px 60px #489dcf, -20px -20px 60px #62d5ff;`],
  [
    {
      color: "rgba(255, 0, 0, 1)",
      intensity: 0.4,
      shape: "convex",
      distance: 35,
      lightSource: "bottomLeft",
    },
    null,
    `background: linear-gradient(45deg, #e60000, #ff0000); box-shadow: 35px -35px 70px #990000, -35px 35px 70px #ff0000;`,
  ],
  [
    {
      color: "rgb(0, 255, 0)",
      intensity: 0.4,
      shape: "pressed",
      blur: 80,
      lightSource: "topLeft",
    },
    null,
    `box-shadow: inset 20px 20px 80px #009900, inset -20px -20px 80px #00ff00;`,
  ],
];
