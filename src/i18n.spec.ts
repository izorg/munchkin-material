/**
 * @jest-environment jsdom
 */

import { getLocale } from "./i18n";

describe("getLocale()", () => {
  test("should get ru locale", () => {
    Object.defineProperty(window.navigator, "languages", {
      configurable: true,
      get() {
        return ["ru"];
      },
    });

    expect(getLocale()).toBe("ru");
  });

  test("should get ru locale from ru-RU language", () => {
    Object.defineProperty(window.navigator, "languages", {
      configurable: true,
      get() {
        return ["ru-RU"];
      },
    });

    expect(getLocale()).toBe("ru");
  });

  test("should get pt locale from pt-PT language", () => {
    Object.defineProperty(window.navigator, "languages", {
      configurable: true,
      get() {
        return ["pt-PT", "pt-BR"];
      },
    });

    expect(getLocale()).toBe("pt");
  });

  test("should get pt-BR locale", () => {
    Object.defineProperty(window.navigator, "languages", {
      configurable: true,
      get() {
        return ["pt-BR", "pt"];
      },
    });

    expect(getLocale()).toBe("pt-BR");
  });

  test("should get en locale from en-US languages", () => {
    Object.defineProperty(window.navigator, "languages", {
      configurable: true,
      get() {
        return ["en-US"];
      },
    });

    expect(getLocale()).toBe("en");
  });
});
