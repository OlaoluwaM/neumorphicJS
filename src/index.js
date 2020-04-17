"use strict";
import { generateDistances, propertyChecker, rgbaToHex } from "./helpers";

//max Intensity = 0.6, min = 0.01
// add descriptions for functions

const shapes = ["concave", "flat", "convex", "pressed"];
const lightAngles = {
  topLeft: "145deg",
  topRight: "225deg",
  bottomRight: "315deg",
  bottomLeft: "45deg",
};

export const generalErrorMessage = "An error has occurred";

export const defaults = {
  shape: "flat",
  color: "#55b9f3",
  intensity: -0.15,
  gradient: false,
  lightSource: "topLeft",
  blur: 60,
  distance: 20,
};

export function deriveOptions(userOptions) {
  let derivedObj;
  const { distance, blur } = userOptions;
  const { distance: dDistance, blur: dBlur } = defaults;

  if (distance !== dDistance && blur === dBlur) {
    derivedObj = { blur: distance * 2 };
  } else if (distance === dDistance && blur !== dBlur) {
    derivedObj = { distance: blur / 2 };
  } else {
    derivedObj = userOptions;
  }

  return { ...userOptions, ...derivedObj };
}

// negative step for lighter, positive step for darker
export function colorDifference(color, step = 0) {
  try {
    if (Number.isInteger(step)) throw "Intensity value can only be a float";

    const pattern = new RegExp(/[\d\w]{2}/, "g");
    const localColorValue = rgbaToHex(color);
    let modifiedHex = "#";

    localColorValue.match(pattern).forEach((hexGroup) => {
      const asDecimal = parseInt(hexGroup, 16);
      let tempVar;

      modifiedHex += "00"
        .concat(
          (tempVar = Math.round(
            Math.min(Math.max(0, asDecimal + asDecimal * step), 255)
          ).toString(16))
        )
        .substr(tempVar.length);
    });

    return modifiedHex;
  } catch (e) {
    console.error(generalErrorMessage);
  }
}

export function neumorph(optionObj) {
  const validOptionsObj = propertyChecker(optionObj, defaults);
  const userOptions = deriveOptions({
    ...defaults,
    ...validOptionsObj,
  });
  const { distance, color, shape, blur, intensity, lightSource } = userOptions;
  const distances = generateDistances(distance, lightSource);
  const inset = shape === shapes[3] ? "inset" : "";
  const lighterColor = colorDifference(color, -intensity);
  const darkerColor = colorDifference(color, intensity);
  let gradient = "";

  if (shapes.includes(shape) && shape.includes("con")) {
    const angle = lightAngles[lightSource];
    const isConcave = shape.endsWith("cave");
    const color1 = colorDifference(color, isConcave ? 0.07 : -0.1);
    const color2 = colorDifference(color, isConcave ? -0.1 : 0.07);

    gradient = `background: linear-gradient(${angle}, ${color1}, ${color2});`;
  }

  return `
  ${gradient}
  box-shadow: ${inset} ${distances[0]}px ${distances[1]}px ${blur}px ${darkerColor},
  ${inset} ${distances[2]}px ${distances[3]}px ${blur}px ${lighterColor};
  `;
}

// console.log(neumorph({ color: "#55b9f3", shape: "convex" }));
