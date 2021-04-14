import fetch from "cross-fetch";

export const CS = "cs";
export const DA = "da";
export const DE = "de";
export const EL = "el";
export const EN = "en";
export const ES = "es";
export const FI = "fi";
export const FR = "fr";
export const HE = "he";
export const HU = "hu";
export const HY = "hy";
export const IT = "it";
export const NB = "nb";
export const NL = "nl";
export const PL = "pl";
export const PT = "pt";
export const PT_BR = "pt-BR";
export const RU = "ru";
export const SK = "sk";
export const TR = "tr";
export const UK = "uk";

export const getDirection = (locale) => ([HE].includes(locale) ? "rtl" : "ltr");

const supportedLocales = [
  CS,
  DA,
  DE,
  EL,
  EN,
  ES,
  FI,
  FR,
  HE,
  HU,
  HY,
  IT,
  NB,
  NL,
  PL,
  PT,
  PT_BR,
  RU,
  SK,
  TR,
  UK,
];

export const getLocale = () => {
  const languages = navigator?.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const language of languages) {
    if (supportedLocales.includes(language)) {
      return language;
    }

    const currentLocale = supportedLocales.find(
      (locale) => locale === language.substring(0, 2)
    );

    if (currentLocale) {
      return currentLocale;
    }
  }

  return EN;
};

export const loadMessages = async (locale) => {
  if ("cordova" in window) {
    const fs = await new Promise((resolve, reject) => {
      window.requestFileSystem(
        window.LocalFileSystem.PERSISTENT,
        0,
        resolve,
        reject
      );
    });

    // eslint-disable-next-line no-console
    console.log("=== fs ===", fs);

    const dirEntry = await new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(
        window.cordova.file.applicationDirectory,
        resolve,
        reject
      );
    });

    // eslint-disable-next-line no-console
    console.log("=== dirEntry ===", dirEntry);

    const fileEntry = await new Promise((resolve, reject) => {
      dirEntry.getFile(
        `www/languages/${locale}.json`,
        { create: false, exclusive: false },
        resolve,
        reject
      );
    });

    // eslint-disable-next-line no-console
    console.log("=== fileEntry ===", fileEntry);

    const text = await new Promise((resolve, reject) => {
      fileEntry.file((file) => {
        const reader = new FileReader();

        reader.onloadend = () => resolve(reader.result);

        reader.readAsText(file);
      }, reject);
    });

    // eslint-disable-next-line no-console
    console.log("=== messsages ===", JSON.parse(text));

    return JSON.parse(text);
  } else {
    const res = await fetch(`/languages/${locale}.json`);

    return await res.json();
  }
};
