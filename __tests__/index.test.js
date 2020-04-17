"use strict";
import { colorDifference, deriveOptions } from "../src/index";

describe("deriveOptions tests", () => {
  test("It works", () => {
    expect(deriveOptions({ distance: 90, blur: 60 })).toEqual({
      distance: 90,
      blur: 180,
    });

    expect(deriveOptions({ blur: 40, distance: 20 })).toEqual({
      distance: 20,
      blur: 40,
    });

    expect(deriveOptions({ color: "#121212" })).toEqual({ color: "#121212" });

    expect(deriveOptions({ distance: 20, blur: 60 })).toEqual({
      distance: 20,
      blur: 60,
    });

    expect(deriveOptions({ distance: 40, blur: 90 })).toEqual({
      distance: 40,
      blur: 90,
    });
  });
});

describe("colorDifference tests", () => {
  test.each([
    ["#55b9f3", 0.15, "#62d5ff"],
    ["#55b9f3", -0.15, "#489dcf"],
    ["#fff", 0.15, "#ffffff"],
    ["rgba(255,255,255,1)", -0.15, "#d9d9d9"],
    ["rgba(255,255,255,.4)", -0.15, "#d9d9d9"],
    ["rgb(0,0,0)", -0.15, "#000000"],
  ])("It works: %s by step %i gave %s", (a, b, expectation) => {
    expect(colorDifference(a, b)).toBe(expectation);
  });

  test.each([
    ["#fff", 12, TypeError],
    ["#ff", 0.15, Error],
    ["rgba(100, 222, 3333)", 11, Error],
  ])("It fails: %s with %i should give an error", (a, b, c) => {
    expect(() => {
      colorDifference(a, b);
    }).toThrow();

    expect(() => {
      colorDifference(a, b);
    }).toThrowError(c);

    expect(() => {
      colorDifference(a, b);
    }).toThrowError(/\w/);
  });
});
