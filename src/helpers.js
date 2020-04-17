"use strict";
import { generalErrorMessage } from "./index";

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

/**
 * Converts uncommon rgb/rgba syntax to more common rgb/rgba syntax, extracting the color values
 * converting them into their hex equivalents
 * @param {string} str
 */
export function standardizeRgbSyntax(str) {
  try {
    if (typeof str !== "string") throw typeof str;
    if (!str.match(rgbRegex)) throw 2;

    const regex = new RegExp(/\d+/, "g");
    const array = str.match(regex);
    if (array.length > 3) array.splice(3, array.length - 3);

    return !str.includes("%")
      ? array
      : array.map((v) => Math.round((parseInt(v) / 100) * 255).toString());
  } catch (error) {
    console.error(generalErrorMessage);

    if (typeof error === "string") {
      throw new TypeError(`Invalid type, should be a string not ${error}`);
    } else {
      throw new SyntaxError(
        `${str} syntax not supported, please use more common rgb/rgba syntax such as: ${validRGBASyntax.join(
          ", "
        )}`
      );
    }
  }
}

/**
 * Converts rgb/rgba strings to their hex equivalents without the # (hashtag)
 * @param {string} rgba - rgb/rgba string
 */
export function rgbaToHex(rgba) {
  if (rgba.match(hexRegex)) {
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

  return r.toLowerCase() + g.toLowerCase() + b.toLowerCase();
}

/**
 * Converts distance into an arry of X and Y box-shadow values, depending on light source specified
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
      if (arguments.length < 2) {
        throw new Error(
          "There are meant to be two parameters for this function"
        );
      } else {
        throw new TypeError(
          `dist = ${dist}, lightSource = ${lightSource}. dist is meant to be a number and lightSource is meant to be a string`
        );
      }
  }
}

/**
 * Checks and validates the data types of user's options object properties
 * @param {{}} optionObj
 * @param {{}} defaults
 */
function typeChecker(optionObj, defaults) {
  try {
    let invalidTypeIndex;
    Object.keys(optionObj).some(
      (key, ind) =>
        typeof defaults[key] !== typeof optionObj[key] &&
        (invalidTypeIndex = ind)
    );
    if (invalidTypeIndex !== void 0) {
      const invalidProperty = Object.keys(optionObj)[invalidTypeIndex];
      const expectedType = typeof defaults[invalidProperty];
      const receivedType = typeof optionObj[invalidProperty];
      throw { invalidProperty, expectedType, receivedType };
    }
    return optionObj;
  } catch (error) {
    const { invalidProperty, expectedType, receivedType } = error;

    const errorMessage = `Received ${receivedType} for property ${invalidProperty} instead of ${expectedType}`;

    console.error(errorMessage);
    throw errorMessage;
  }
}

/**
 * Checks and validates the properties on the user's options object
 * @param {{}} optionsObj
 * @param {{}} defaults
 */
export function propertyChecker(optionsObj, defaults) {
  debugger;
  try {
    let invalidPropertyIndex;
    Object.keys(optionsObj).some(
      (key, ind) =>
        !defaults.hasOwnProperty(key) && (invalidPropertyIndex = ind)
    );

    if (invalidPropertyIndex !== void 0) {
      const invalidProperty = Object.keys(optionsObj)[invalidPropertyIndex];
      throw `${invalidProperty} is not a valid property`;
    } else {
      return typeChecker(optionsObj, defaults);
    }
  } catch (error) {
    const errorMessage = error;

    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
