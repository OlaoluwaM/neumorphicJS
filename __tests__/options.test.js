import { defaults, deriveOptions } from "../index";

describe("Option correctly rendered", () => {
  test("Blur works", () => {
    const testObj = { ...defaults, ...{ distance: 70 } };
    const { blur } = deriveOptions(testObj);
    expect(blur).toBe(70 * 2);
  });

  test("Distance", () => {
    const testObj = { ...defaults, ...{ size: 300 } };
    const { distance } = deriveOptions(testObj);
    expect(distance).toBe(0.1 * 300);
  });

  test("Defaults rendered", () => {
    const testObj = { ...defaults, ...{ shape: "flat" } };
    const { distance, blur, size } = deriveOptions(testObj);

    expect(distance).toEqual(defaults.distance);
    expect(blur).toEqual(defaults.blur);
    expect(size).toEqual(defaults.size);
  });
});
