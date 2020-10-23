import { promises as fs } from 'fs';
import path from 'path';

import { duration } from '@material-ui/core/styles/transitions.js';
import { chromium, devices } from 'playwright';

const CS = 'cs';
const EN = 'en';
const HE = 'he';
const RU = 'ru';
const UK = 'uk';

const appUrl = `http://localhost:3000`;

const browsers = Object.entries({ chromium });

const browserDevices = {
  chromium: Object.entries({
    Nexus5: devices['Nexus 5'],
    Nexus7: devices['Nexus 7'],
    Nexus10: devices['Nexus 10'],
    iPhone6Plus: devices['iPhone 6 Plus'],
    iPhone11ProMax: devices['iPhone 11 Pro Max'],
    iPadPro: {
      viewport: {
        width: 1024,
        height: 1366,
      },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    },
  }),
};

const dir = 'screenshots';

const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const range = (start, end) =>
  Array.from(Array(Math.abs(end - start) + 1), (_, i) => start + i);

const getScreenshots = async (browserType, device, locale, deviceName) => {
  const screenshotDir = path.join(dir, locale, deviceName);

  try {
    await fs.mkdir(screenshotDir, {
      recursive: true,
    });
  } catch (e) {
    // dir exists
  }

  const menuSelector = '[data-screenshot="drawer-menu"]';

  const browser = await browserType.launch({ headless: false });
  const context = await browser.newContext(device);
  const page = await context.newPage();

  page.setDefaultTimeout(1000);
  page.setDefaultNavigationTimeout(5000);

  let count = 0;

  // Home
  count += 1;
  await page.goto(appUrl, { waitUntil: 'networkidle' });
  await page.evaluate((testLocale) => {
    window.munchkinDev.setLocale(testLocale);
    window.munchkinDev.setTestData();
  }, locale);
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-home.png`),
  });
  console.log('📸 home');

  // Player
  count += 1;
  await page.click('[data-screenshots="player-list-item"]');
  await delay(duration.enteringScreen * 2);
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-player.png`),
  });
  console.log('📸 player');

  // Dice
  count += 1;
  await page.click('[data-screenshots="player-dice-button"]');
  await delay(duration.enteringScreen);
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-dice.png`),
  });
  console.log('📸 dice');

  // Combat
  await page.keyboard.down('Escape');
  await delay(duration.enteringScreen);
  count += 1;
  await page.click('[data-screenshots="combat-button"]');
  await delay(duration.enteringScreen);
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-combat.png`),
  });
  console.log('📸 combat');

  // Single mode
  await page.click('[data-screenshots="combat-back-button"]');
  await delay(duration.enteringScreen * 2);
  await page.click('[data-screenshots="player-back-button"]');
  await delay(duration.enteringScreen * 2);
  count += 1;

  if (deviceName === 'iPadPro') {
    await page.click('[data-screenshots="single-mode-item"]');
  } else {
    await page.click('[data-screenshots="menu"]');
    await delay(duration.enteringScreen);
    await page.click(`${menuSelector} [data-screenshots="single-mode-item"]`);
  }

  await delay(duration.leavingScreen);
  await Promise.all(
    range(0, 3).map(async () =>
      page.click(
        '[data-screenshots="level-counter"] [data-screenshots="increment-button"]',
      ),
    ),
  );
  await Promise.all(
    range(0, 8).map(async () =>
      page.click(
        '[data-screenshots="gear-counter"] [data-screenshots="increment-button"]',
      ),
    ),
  );
  await Promise.all(
    range(0, 3).map(async () =>
      page.click(
        '[data-screenshots="modifier-counter"] [data-screenshots="decrement-button"]',
      ),
    ),
  );
  await delay(duration.enteringScreen);
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-single.png`),
  });
  console.log('📸 single');

  await browser.close();
};

const locales = [CS, EN, HE, RU, UK];

const screenshots = async () => {
  await fs.rmdir(path.join(dir), { recursive: true });

  for (const [browserName, browserType] of browsers) {
    for (const locale of locales) {
      for (const [deviceName, device] of browserDevices[browserName]) {
        console.log(`🌍 ${locale}`);
        console.log(`📱 ${deviceName}`);
        await getScreenshots(browserType, device, locale, deviceName);
      }
    }
  }
};

screenshots();
