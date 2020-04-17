"use strict";
import { neumorph } from "../src/index";
import { passingCases } from "../test-cases/output-cases";

describe("Output tests", () => {
  test.each(passingCases)(
    "option: %o, ignore %p; should equal %s",
    (a, _, expectation) => {
      const value = neumorph(a);

      expect(value).toBeDefined();
      expect(typeof value === "string").toBeTruthy();
      expect(value).toBe(expectation);
    }
  );
});
