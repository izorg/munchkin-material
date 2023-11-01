import { describe, expect, test } from "@jest/globals";

import toggleSex from "./toggleSex";
import { Sex } from "./types";

describe("Sex toggle", () => {
  test("should change female to male and vice versa", () => {
    expect(toggleSex(Sex.Female)).toBe(Sex.Male);
    expect(toggleSex(Sex.Male)).toBe(Sex.Female);
  });
});
