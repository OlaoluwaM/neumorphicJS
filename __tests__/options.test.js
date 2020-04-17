import { defaults, deriveOptions } from "../src/index";

describe("Option correctly rendered", () => {
  test("Blur works", () => {
    const testObj = { ...defaults, ...{ distance: 70 } };
    const { blur } = deriveOptions(testObj);
    expect(blur).toBe(70 * 2);
  });

  test("Defaults rendered", () => {
    const testObj = { ...defaults, ...{ shape: "flat" } };
    const { distance, blur, size } = deriveOptions(testObj);

    expect(distance).toEqual(defaults.distance);
    expect(blur).toEqual(defaults.blur);
    expect(size).toEqual(defaults.size);
  });
});
