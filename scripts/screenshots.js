// @ts-check

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { duration } from "@mui/material";
import { Parcel } from "@parcel/core";
import { chromium, devices } from "playwright";

process.chdir("packages/web");

const bundler = new Parcel({
  defaultConfig: "@parcel/config-default",
  entries: "src/index.html",
  env: {
    NODE_ENV: "development",
  },
  mode: "development",
  serveOptions: {
    port: 3000,
  },
});

await bundler.watch();

const CS = "cs";
const DA = "da";
const DE = "de";
const EL = "el";
const EN = "en";
const ES = "es";
const FI = "fi";
const FR = "fr";
const HE = "he";
const HU = "hu";
const HY = "hy";
const IT = "it";
const NB = "nb";
const NL = "nl";
const PL = "pl";
const PT = "pt";
const PT_BR = "pt-BR";
const RU = "ru";
const SK = "sk";
const TR = "tr";
const UK = "uk";

const appUrl = "http://localhost:3000";

const browsers = Object.entries({ chromium });

const browserDevices = {
  chromium: Object.entries({
    iPadPro: {
      deviceScaleFactor: 2,
      hasTouch: true,
      isMobile: true,
      viewport: {
        height: 1366,
        width: 1024,
      },
    },
    iPhone11ProMax: {
      ...devices["iPhone 11 Pro Max"],
      viewport: {
        height: 896,
        width: 414,
      },
    },
    iPhone6Plus: devices["iPhone 6 Plus"],
    Nexus10: devices["Nexus 10"],
    Nexus5: devices["Nexus 5"],
    Nexus7: devices["Nexus 7"],
    Windows: {
      deviceScaleFactor: 2,
      viewport: {
        height: 768,
        width: 1366,
      },
    },
  }),
};

const dir = "../../screenshots";

const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const getScreenshots = async (browserType, device, locale, deviceName) => {
  const screenshotDir = path.join(dir, locale, deviceName);

  await fs.promises.mkdir(screenshotDir, {
    recursive: true,
  });

  const browser = await browserType.launch({ headless: false });
  const context = await browser.newContext(device);
  const page = await context.newPage();

  page.setDefaultTimeout(2000);
  page.setDefaultNavigationTimeout(5000);

  let count = 0;

  // Home
  count += 1;
  await page.goto(appUrl, { waitUntil: "networkidle" });
  await page.evaluate((testLocale) => {
    window.munchkinDev.setLocale(testLocale);
    window.munchkinDev.setTestData();
  }, locale);
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-home.png`),
  });
  console.log("📸 home");

  // Player
  count += 1;
  await page.click('[data-screenshots="player-list-item"]');
  await delay(duration.enteringScreen * 2);
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-player.png`),
  });
  console.log("📸 player");

  // Dice
  count += 1;
  await page.click('[data-screenshots="player-dice-button"]');
  await delay(duration.enteringScreen);
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-dice.png`),
  });
  console.log("📸 dice");

  // Combat
  await page.keyboard.down("Escape");
  await delay(duration.enteringScreen);
  count += 1;
  await page.click('[data-screenshots="combat-button"]');
  await delay(duration.enteringScreen);
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-combat.png`),
  });
  console.log("📸 combat");

  // Single mode
  await page.click('[data-screenshots="combat-back-button"]');
  await delay(duration.enteringScreen * 2);
  await page.click('[data-screenshots="player-back-button"]');
  await delay(duration.enteringScreen * 2);
  count += 1;

  await page.click('[data-screenshots="settings"]');
  await delay(duration.enteringScreen);
  await page.click('[data-screenshots="single-mode-item"]');
  await page.click('[data-screenshots="back"]');

  await delay(duration.leavingScreen);
  await page.click(
    '[data-screenshots="level-counter"] [data-screenshots="increment-button"]',
    {
      clickCount: 4,
    },
  );
  await page.click(
    '[data-screenshots="gear-counter"] [data-screenshots="increment-button"]',
    {
      clickCount: 9,
    },
  );
  await page.click(
    '[data-screenshots="modifier-counter"] [data-screenshots="decrement-button"]',
    {
      clickCount: 4,
    },
  );
  await delay(630); // https://github.com/mui/material-ui/blob/023c5c7ef29c49b2b3a54ba911cd902d0851f8dd/packages/mui-material-next/src/ButtonBase/TouchRipple.tsx#L13-L14
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-single.png`),
  });
  console.log("📸 single");

  await browser.close();
};

const locales = [
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

if (fs.existsSync(dir)) {
  await fs.promises.rm(dir, { recursive: true });
}

for (const [browserName, browserType] of browsers) {
  for (const locale of locales) {
    for (const [deviceName, device] of browserDevices[browserName]) {
      console.log(`🌍 ${locale}`);
      console.log(`📱 ${deviceName}`);
      await getScreenshots(browserType, device, locale, deviceName);
    }
  }
}

// eslint-disable-next-line unicorn/no-process-exit -- stop parcel watch
process.exit();
