/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

import { range } from 'lodash';
import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';
import rimraf from 'rimraf';
import { duration } from 'material-ui/styles/transitions';
import { URL } from 'url';

import { EN, RU } from '../src/i18n';
import config from '../webpack/site.babel';

const { devServer: { host, port } } = config;

const appUrl = `http://${host}:${port}`;

const mobile = devices['Nexus 5'];
const dir = 'screenshots';

if (fs.existsSync(dir)) {
  rimraf(dir, () => fs.mkdirSync(dir));
} else {
  fs.mkdirSync(dir);
}

const getScreenshots = async ({ locale }) => {
  console.log('locale', locale);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Catch + "forward" hashchange events from page to node puppeteer.
  await page.exposeFunction('onHashChange', (url) =>
    page.emit('hashchange', url),
  );
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('hashchange', () =>
      window.onHashChange(window.location.href),
    );
  });

  // Listen for hashchange events in node Puppeteer code.
  page.on('hashchange', (url) =>
    console.log('hashchange event:', new URL(url).hash),
  );

  await page.emulate(mobile);

  let count = 0;

  // Home
  count += 1;
  await page.goto(appUrl);
  page.evaluate((testLocale) => {
    window.munchkinDev.setLocale(testLocale);
    window.munchkinDev.setTestData();
  }, locale);
  await page.screenshot({
    path: path.join(dir, `${locale}-${count}-home.png`),
  });

  // Player
  count += 1;
  await page.click('[data-screenshots="player-list-item"]');
  await page.waitFor(duration.enteringScreen);
  await page.screenshot({
    path: path.join(dir, `${locale}-${count}-player.png`),
  });

  // Dice
  count += 1;
  await page.click('[data-screenshots="player-dice-button"]');
  await page.waitFor(duration.enteringScreen);
  await page.screenshot({
    path: path.join(dir, `${locale}-${count}-dice.png`),
  });

  // Combat
  await page.keyboard.down('Escape');
  await page.waitFor(duration.enteringScreen);
  count += 1;
  await page.click('[data-screenshots="combat-button"]');
  await page.waitFor(duration.enteringScreen);
  await page.screenshot({
    path: path.join(dir, `${locale}-${count}-combat.png`),
  });

  // Single mode
  await page.click('[data-screenshots="combat-back-button"]');
  await page.waitFor(duration.leavingScreen);
  await page.click('[data-screenshots="player-back-button"]');
  await page.waitFor(duration.leavingScreen);
  count += 1;
  await page.click('[data-screenshots="menu"]');
  await page.waitFor(duration.enteringScreen);
  await page.click('[data-screenshots="single-mode-item"]');
  await page.waitFor(duration.leavingScreen);
  await Promise.all(
    range(3).map(async () =>
      page.click(
        '[data-screenshots="level-counter"] [data-screenshots="increment-button"]',
      ),
    ),
  );
  await Promise.all(
    range(8).map(async () =>
      page.click(
        '[data-screenshots="gear-counter"] [data-screenshots="increment-button"]',
      ),
    ),
  );
  await Promise.all(
    range(3).map(async () =>
      page.click(
        '[data-screenshots="modifier-counter"] [data-screenshots="decrement-button"]',
      ),
    ),
  );
  await page.waitFor(duration.enteringScreen);
  await page.screenshot({
    path: path.join(dir, `${locale}-${count}-single.png`),
  });

  await browser.close();
};

(async () => {
  await getScreenshots({ locale: EN });
  await getScreenshots({ locale: RU });
})();
