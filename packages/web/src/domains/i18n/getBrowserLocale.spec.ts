import { afterEach, describe, expect, jest, test } from "@jest/globals";

import { getBrowserLocale } from "./getBrowserLocale";

describe("getBrowserLocale()", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should get ru locale", () => {
    jest.spyOn(navigator, "languages", "get").mockImplementation(() => ["ru"]);

    expect(getBrowserLocale()).toBe("ru");
  });

  test("should get ru locale from ru-RU language", () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["ru-RU"]);

    expect(getBrowserLocale()).toBe("ru");
  });

  test("should get pt locale from pt-PT language", () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["pt-PT", "pt-BR"]);

    expect(getBrowserLocale()).toBe("pt");
  });

  test("should get pt-BR locale", () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["pt-BR", "pt"]);

    expect(getBrowserLocale()).toBe("pt-BR");
  });

  test("should get en locale from en-US languages", () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["en-US"]);

    expect(getBrowserLocale()).toBe("en");
  });

  test("should get fallback en locale if languages is not supported", () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["ja-JP"]);

    expect(getBrowserLocale()).toBe("en");
  });
});
