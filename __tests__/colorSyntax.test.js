"use strict";
import { standardizeRgbSyntax } from "../helpers";

describe("Standardize rgb syntax", () => {
  test("RGBA with %", () => {
    const value = standardizeRgbSyntax("rgba(100%, 50%, 20%, 0.5)");
    expect(Array.isArray(value)).toBeTruthy();
    expect(value).toEqual(["255", "128", "51"]);
  });

  test.each([
    [null, "rgba(100, 50, 20 /0.5)", SyntaxError],
    [null, 2003, TypeError],
    [null, "2003", SyntaxError],
  ])("%p. %p should throw %o", (_, b, expected) => {
    expect(() => {
      standardizeRgbSyntax(b);
    }).toThrow();

    expect(() => {
      standardizeRgbSyntax(b);
    }).toThrowError(expected);

    expect(() => {
      standardizeRgbSyntax(b);
    }).toThrowError(/\w/);
  });

  test.only.each([
    [null, "rgba(1,2,3,1)", true],
    [null, "rgba(100%, 20%, 50%, 0.5)", true],
    [null, "rgb(20,20,20)", true],
    [null, "rgba(100%, 20%, 50%, 3)", false],
    [null, "rgba(10 20 50 / .3)", false],
    [null, "rgb(1)", false],
    [null, "rgba(a, b)", false],
    [null, "rgb(10, 10,)", false],
    [null, "rgba(10, 10, 10, 20)", false],
    [null, "rgba(10, 10)", false],
  ])("%p RGB regex test for %s", (_, b, expectation) => {
    const rgbRegex = new RegExp(
      /((rgb)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/,
      "ig"
    );
    expect(!!b.match(rgbRegex)).toBe(expectation);
  });
});