"use strict";
import { generalErrorMessage } from "./index";
/**
 * Converts other variants of rgb/rgba syntax to the most common one 'rgba(r, g, b, a)'
 *
 */

const rgbRegex = new RegExp(
  /((rgb)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/,
  "ig"
);

const hexRegex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "igm");

const validRGBASyntax = [
  "rgba(r,g,b,a)",
  "rgba(r%, g%, b%, a)",
  "rgb(r,g,b)",
  "rgb(r%, g%, b%)",
];
export function standardizeRgbSyntax(str) {
  try {
    if (typeof str !== "string") throw typeof str;
    if (!str.includes("rgba") || str.includes("/")) throw 2;

    const regex = new RegExp(/\d+/, "g");
    const array = str.match(regex);
    if (array.length > 3) array.pop();
    return !str.includes("%")
      ? array
      : array.map((v) => Math.round((parseInt(v) / 100) * 255).toString());
  } catch (error) {
    console.error(generalErrorMessage);

    if (typeof error === "string") {
      throw new TypeError(`Invalid type, should be a string not ${error}`);
    } else {
      throw new SyntaxError(
        `${str} syntax nor supported, please use more common rgb syntax such as: ${validRGBASyntax.join(
          ", "
        )}`
      );
    }
  }
}

/**
 * Converts rgb/rgba strings to their hex equivalents without the #
 * @param {string} rgba - rgb/rgba string
 */

export function rgbaToHex(rgba) {
  if (!!rgba.match(hexRegex)) {
    const hex = rgba.replace("#", "");
    if (hex.length === 6) return hex;
    const result = hex.split("").map((v) => v.repeat(2));
    return result.join("");
  }

  const rgbArray = standardizeRgbSyntax(rgba);
  const isSingle = (ind) => (rgbArray[ind].length === 1 ? "0" : "");

  let r = `${isSingle(0)}${parseInt(rgbArray[0]).toString(16)}`,
    g = `${isSingle(1)}${parseInt(rgbArray[1]).toString(16)}`,
    b = `${isSingle(2)}${parseInt(rgbArray[2]).toString(16)}`;

  return r + g + b;
}

/**
 * Converts distance into box-shadow values in an array depending on light source
 * @param {number} dist - distance in number
 * @param {string} lightSource - light source
 */

export function generateDistances(dist, lightSource) {
  switch (lightSource) {
    case "topLeft":
      return [dist, dist, -dist, -dist];

    case "topRight":
      return [-dist, dist, dist, -dist];

    case "bottomRight":
      return [-dist, -dist, dist, dist];

    case "bottomLeft":
      return [dist, -dist, -dist, dist];

    default:
      console.error(generalErrorMessage);
      throw new Error(errorMessages[2]);
  }
}

function typeChecker(optionObj) {
  try {
    let invalidTypeIndex;
    Object.keys(optionObj).some(
      (key, ind) =>
        typeof defaults[key] !== typeof optionObj[key] &&
        (invalidTypeIndex = ind)
    );
    if (invalidTypeIndex) {
      const invalidProperty = Object.keys(optionObj)[invalidTypeIndex];
      const expectedType = typeof defaults[invalidProperty];
      const receivedType = typeof optionObj[invalidProperty];
      throw { invalidProperty, expectedType, receivedType };
    }
  } catch (error) {
    const { invalidProperty, expectedType, receivedType } = error;

    const errorMessage = `Received ${receivedType} for ${invalidProperty} instead of ${expectedType}`;

    console.error(errorMessage);
    throw new TypeError(errorMessage);
  }
}
export function propertyChecker(options, defaults) {
  try {
    const optionsObj = typeChecker(options, defaults);
    let invalidPropertyIndex;
    Object.keys(optionObj).some(
      (key, ind) =>
        !defaults.hasOwnProperty(key) && (invalidPropertyIndex = ind)
    );
    if (invalidPropertyIndex) {
      const invalidProperty = Object.keys(optionObj)[invalidPropertyIndex];
      throw invalidProperty;
    } else {
      return optionObj;
    }
  } catch (error) {
    const errorMessage = `${error} is not a valid property`;

    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
