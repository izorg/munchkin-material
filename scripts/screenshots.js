const fs = require('fs').promises;
const path = require('path');

const { duration } = require('@material-ui/core/styles/transitions');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const config = require('../webpack.config');

const CS = 'cs';
const EN = 'en';
const HE = 'he';
const RU = 'ru';
const UK = 'uk';

const {
  devServer: { host, port },
} = config;

const appUrl = `http://${host}:${port}`;

const sizes = {
  mobile: devices['Nexus 5'],
  tablet7: devices['Nexus 7'],
  tablet10: devices['Nexus 10'],
  iphone65: {
    viewport: {
      width: 414,
      height: 896,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1',
  },
  iphone55: {
    viewport: {
      width: 414,
      height: 736,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1',
  },
  ipadpro129: {
    viewport: {
      width: 1024,
      height: 1366,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    },
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1',
  },
};

const dir = 'screenshots';

const range = (start, end) =>
  Array.from(Array(Math.abs(end - start) + 1), (_, i) => start + i);

const getScreenshots = async ({ locale, size }) => {
  console.log(`🌍 ${locale}`);
  console.log(`📱 ${size}`);

  const screenshotDir = path.join(dir, locale, size);

  try {
    await fs.mkdir(screenshotDir, {
      recursive: true,
    });
  } catch (e) {
    // dir exists
  }

  const menuSelector = '[data-screenshot="drawer-menu"]';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.setDefaultTimeout(1000);
  page.setDefaultNavigationTimeout(5000);

  await page.emulate(sizes[size]);

  let count = 0;

  // Home
  count += 1;
  await page.goto(appUrl, { waitUntil: 'networkidle0' });
  page.evaluate((testLocale) => {
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
  await page.waitFor(duration.enteringScreen * 2);
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-player.png`),
  });
  console.log('📸 player');

  // Dice
  count += 1;
  await page.click('[data-screenshots="player-dice-button"]');
  await page.waitFor(duration.enteringScreen);
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-dice.png`),
  });
  console.log('📸 dice');

  // Combat
  await page.keyboard.down('Escape');
  await page.waitFor(duration.enteringScreen);
  count += 1;
  await page.click('[data-screenshots="combat-button"]');
  await page.waitFor(duration.enteringScreen);
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-combat.png`),
  });
  console.log('📸 combat');

  // Single mode
  await page.click('[data-screenshots="combat-back-button"]');
  await page.waitFor(duration.enteringScreen * 2);
  await page.click('[data-screenshots="player-back-button"]');
  await page.waitFor(duration.enteringScreen * 2);
  count += 1;

  if (size !== 'ipadpro129') {
    await page.click('[data-screenshots="menu"]');
    await page.waitFor(duration.enteringScreen);
    await page.click(`${menuSelector} [data-screenshots="single-mode-item"]`);
  } else {
    await page.click('[data-screenshots="single-mode-item"]');
  }

  await page.waitFor(duration.leavingScreen);
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
  await page.waitFor(duration.enteringScreen);
  await page.screenshot({
    path: path.join(screenshotDir, `${count}-single.png`),
  });
  console.log('📸 single');

  await browser.close();
};

const locales = [CS, EN, HE, RU, UK];

const screenshots = async () => {
  await fs.rmdir(path.join(dir), {
    recursive: true,
  });

  for (const locale of locales) {
    for (const size of Object.keys(sizes)) {
      await getScreenshots({ locale, size });
    }
  }
};

screenshots();
