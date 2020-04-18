export const passingCases = [
  [
    { color: "#f2f2f2", intensity: 0.3 },
    null,
    `${[
      "background: #f2f2f2;",
      "\n",
      "box-shadow: 20px 20px 60px #a9a9a9, -20px -20px 60px #ffffff;",
    ].join("")}`,
  ],
  [
    { shape: "pressed", lightSource: "topRight", color: "#6722ff" },
    null,
    `${[
      "background: #6722ff;",
      "\n",
      "box-shadow: inset -20px 20px 60px #581dd9, inset 20px -20px 60px #7627ff;",
    ].join("")}`,
  ],
  [
    { shape: "concave", lightSource: "bottomRight", color: "#6722ff" },
    null,
    `${[
      "background: linear-gradient(315deg, #6e24ff, #5d1fe6);",
      "\n",
      "box-shadow: -20px -20px 60px #581dd9, 20px 20px 60px #7627ff;",
    ].join("")}`,
  ],
  [
    {},
    null,
    `${[
      "background: #55b9f3;",
      "\n",
      "box-shadow: 20px 20px 60px #489dcf, -20px -20px 60px #62d5ff;",
    ].join("")}`,
  ],
  [
    {
      color: "rgba(255, 0, 0, 1)",
      intensity: 0.4,
      shape: "convex",
      distance: 35,
      lightSource: "bottomLeft",
    },
    null,
    `${[
      "background: linear-gradient(45deg, #e60000, #ff0000);",
      "\n",
      "box-shadow: 35px -35px 70px #990000, -35px 35px 70px #ff0000;",
    ].join("")}`,
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
    `${[
      "background: rgb(0, 255, 0);",
      "\n",
      "box-shadow: inset 20px 20px 80px #009900, inset -20px -20px 80px #00ff00;",
    ].join("")}`,
  ],
];
