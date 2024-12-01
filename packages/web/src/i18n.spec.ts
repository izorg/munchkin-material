import { afterEach, describe, expect, jest, test } from "@jest/globals";

import { getLocale } from "./i18n";

describe("getLocale()", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should get ru locale", () => {
    jest.spyOn(navigator, "languages", "get").mockImplementation(() => ["ru"]);

    expect(getLocale()).toBe("ru");
  });

  test("should get ru locale from ru-RU language", () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["ru-RU"]);

    expect(getLocale()).toBe("ru");
  });

  test("should get pt locale from pt-PT language", () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["pt-PT", "pt-BR"]);

    expect(getLocale()).toBe("pt");
  });

  test("should get pt-BR locale", () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["pt-BR", "pt"]);

    expect(getLocale()).toBe("pt-BR");
  });

  test("should get en locale from en-US languages", () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["en-US"]);

    expect(getLocale()).toBe("en");
  });

  test("should get fallback en locale if languages is not supported", () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["ja-JP"]);

    expect(getLocale()).toBe("en");
  });
});
