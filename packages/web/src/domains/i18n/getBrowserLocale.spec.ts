import { afterEach, describe, expect, jest, test } from "@jest/globals";

import { getBrowserLocale } from "./getBrowserLocale";

describe("getBrowserLocale()", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should get ru locale", async () => {
    jest.spyOn(navigator, "languages", "get").mockImplementation(() => ["ru"]);

    await expect(getBrowserLocale()).resolves.toBe("ru");
  });

  test("should get ru locale from ru-RU language", async () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["ru-RU"]);

    await expect(getBrowserLocale()).resolves.toBe("ru");
  });

  test("should get pt locale from pt-PT language", async () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["pt-PT", "pt-BR"]);

    await expect(getBrowserLocale()).resolves.toBe("pt");
  });

  test("should get pt-BR locale", async () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["pt-BR", "pt"]);

    await expect(getBrowserLocale()).resolves.toBe("pt-BR");
  });

  test("should get en locale from en-US languages", async () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["en-US"]);

    await expect(getBrowserLocale()).resolves.toBe("en");
  });

  test("should get fallback en locale if languages is not supported", async () => {
    jest
      .spyOn(navigator, "languages", "get")
      .mockImplementation(() => ["ja-JP"]);

    await expect(getBrowserLocale()).resolves.toBe("en");
  });
});
