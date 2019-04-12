const fs = require('fs');
const path = require('path');

const { range } = require('lodash/fp');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const rimraf = require('rimraf');
const { duration } = require('@material-ui/core/styles/transitions');

const config = require('../webpack.config');

const EN = 'en';
const RU = 'ru';

const {
  devServer: { host, port },
} = config;

const appUrl = `http://${host}:${port}`;

const sizes = {
  mobile: devices['Nexus 5'],
  tablet7: devices['Nexus 7'],
  tablet10: devices['Nexus 10'],
  iPhoneXs: {
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
};
const dir = 'screenshots';

if (fs.existsSync(dir)) {
  rimraf(dir, () => fs.mkdirSync(dir));
} else {
  fs.mkdirSync(dir);
}

const getScreenshots = async ({ locale, size = 'mobile' }) => {
  console.log('locale', locale);

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
    path: path.join(dir, `${locale}-${size}-${count}-home.png`),
  });

  // Player
  count += 1;
  await page.click('[data-screenshots="player-list-item"]');
  await page.waitFor(duration.enteringScreen);
  await page.screenshot({
    path: path.join(dir, `${locale}-${size}-${count}-player.png`),
  });

  // Dice
  count += 1;
  await page.click('[data-screenshots="player-dice-button"]');
  await page.waitFor(duration.enteringScreen);
  await page.screenshot({
    path: path.join(dir, `${locale}-${size}-${count}-dice.png`),
  });

  // Combat
  await page.keyboard.down('Escape');
  await page.waitFor(duration.enteringScreen);
  count += 1;
  await page.click('[data-screenshots="combat-button"]');
  await page.waitFor(duration.enteringScreen);
  await page.screenshot({
    path: path.join(dir, `${locale}-${size}-${count}-combat.png`),
  });

  // Single mode
  await page.click('[data-screenshots="combat-back-button"]');
  await page.waitFor(duration.enteringScreen * 2);
  await page.click('[data-screenshots="player-back-button"]');
  await page.waitFor(duration.enteringScreen * 2);
  count += 1;
  await page.click('[data-screenshots="menu"]');
  await page.waitFor(duration.enteringScreen);
  await page.click(`${menuSelector} [data-screenshots="single-mode-item"]`);
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
    path: path.join(dir, `${locale}-${size}-${count}-single.png`),
  });

  await browser.close();
};

(async () => {
  await getScreenshots({ locale: EN, size: 'mobile' });
  await getScreenshots({ locale: RU, size: 'mobile' });
  await getScreenshots({ locale: EN, size: 'tablet7' });
  await getScreenshots({ locale: RU, size: 'tablet7' });
  await getScreenshots({ locale: EN, size: 'tablet10' });
  await getScreenshots({ locale: RU, size: 'tablet10' });
})();
