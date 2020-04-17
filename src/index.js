"use strict";
import { generateDistances, propertyChecker, rgbaToHex } from "./helpers";

export const generalErrorMessage = "An error has occurred";
const shapes = ["concave", "flat", "convex", "pressed"];

const lightAngles = {
  topLeft: "145deg",
  topRight: "225deg",
  bottomRight: "315deg",
  bottomLeft: "45deg",
};
export const defaults = {
  shape: "flat",
  color: "#55b9f3",
  intensity: 0.15,
  lightSource: "topLeft",
  blur: 60,
  distance: 20,
};

/**
 * Derives the blur property from the value of the distance property;
 * @param {{}} userOptions
 */
export function deriveOptions(userOptions) {
  let derivedObj;
  const { distance, blur } = userOptions;
  const { distance: dDistance, blur: dBlur } = defaults;

  if (distance !== dDistance && blur === dBlur) {
    derivedObj = { blur: Math.round(distance * 2) };
  } else {
    derivedObj = userOptions;
  }

  return { ...userOptions, ...derivedObj };
}

/**
 * Generates a shade of the specified 'color' that is lighter or darker depending on the 'step' value
 * @param {string} color
 * @param {number} step - negative for a darker shade, positive for a lighter shade
 */
export function colorDifference(color, step = 0) {
  try {
    if (Number.isInteger(step)) throw "Intensity value can only be a float";
    if (step > 0.6 || step < -0.6) {
      throw "Value of intensity property must be < 0.6 or > -0.6";
    }

    if (step > 0.6 || step < -0.6) {
      throw "Value of intensity property must be < 0.6 or > -0.6";
    }

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
    throw new TypeError(e);
  }
}

/**
 * Generates box-shadow property for neumorphism effect
 * @param {{}} optionObj
 */
export function neumorph(optionObj = defaults) {
  const validOptionsObj = propertyChecker(optionObj, defaults);
  const userOptions = deriveOptions({
    ...defaults,
    ...validOptionsObj,
  });

  const { distance, color, shape, blur, intensity, lightSource } = userOptions;
  const distances = generateDistances(distance, lightSource);

  const inset = shape === shapes[3] ? " inset" : "";
  let gradient = "";

  const darkerColor = colorDifference(color, -intensity);
  const lighterColor = colorDifference(color, intensity);

  if (shapes.includes(shape) && shape.includes("con")) {
    const angle = lightAngles[lightSource];
    const isConcave = shape.endsWith("cave");

    const color1 = colorDifference(color, isConcave ? 0.07 : -0.1);
    const color2 = colorDifference(color, isConcave ? -0.1 : 0.07);

    gradient = `background: linear-gradient(${angle}, ${color1}, ${color2}); `;
  }

  return `${gradient}box-shadow:${inset} ${distances[0]}px ${distances[1]}px ${blur}px ${darkerColor},${inset} ${distances[2]}px ${distances[3]}px ${blur}px ${lighterColor};`.trim();
}
