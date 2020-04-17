"use strict";

import { generateDistances, propertyChecker } from "../src/helpers";
import { defaults } from "../src/index";

describe("generateDistances function tests", () => {
  test("It works", () => {
    expect(generateDistances(20, "topLeft")).toBeDefined();
    expect(Array.isArray(generateDistances(20, "topLeft"))).toBeTruthy();
    expect(generateDistances(10000, "bottomLeft")).toBeDefined();
  });

  test("Throws appropriate error", () => {
    expect(() => {
      generateDistances(200);
    }).toThrow();

    expect(() => {
      generateDistances(200);
    }).toThrowError(/\w/);

    expect(() => {
      generateDistances("200", { one: 200 });
    }).toThrow();

    expect(() => {
      generateDistances("200", { one: 200 });
    }).toThrowError(TypeError);
  });
});

describe("Validity checker function", () => {
  test.each([
    [{ color: "#000", shape: "pressed" }, void 0, true],
    [{ intensity: 0.5, distance: 20 }, void 0, true],
    [{ hue: "red" }, void 0, false],
    [{ range: 100, blur: 60 }, void 0, false],
    [{ color: 222, shape: 123 }, void 0, false],
  ])("%o and %o should be %p", (option, _, expectation) => {
    if (expectation) {
      const value = propertyChecker(option, defaults);
      const defaultProperties = Object.keys(defaults).join(", ");
      const userProperties = Object.keys(value);

      expect(typeof value === "object").toBeTruthy();

      expect(
        userProperties.every((str) => defaultProperties.includes(str))
      ).toBeTruthy();
    } else {
      expect(() => {
        propertyChecker(option, defaults);
      }).toThrow();

      expect(() => {
        propertyChecker(option, defaults);
      }).toThrowError(/\w/);

      expect(() => {
        propertyChecker(option, defaults);
      }).toThrowError(Error);
    }
  });
});
