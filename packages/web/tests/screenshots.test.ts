import { test } from "@playwright/test";

import { getPlayers } from "../src/dev/players";
import { availableLocales } from "../src/i18n";

const delay = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

for (const locale of availableLocales) {
  test.describe(locale, () => {
    test.use({
      locale,
    });

    test("Screenshots", async ({ page }, { project }) => {
      const players = getPlayers(locale);

      await page.emulateMedia({
        reducedMotion: "reduce",
      });

      await page.addInitScript((players) => {
        localStorage.setItem(
          "redux",
          JSON.stringify({
            playerList: players.map((player) => player.id),
            players: Object.fromEntries(
              players.map((player) => [player.id, player]),
            ),
          }),
        );
      }, players);

      await page.goto("/");

      await page.screenshot({
        path: `screenshots/${project.name}/${locale}/1-home.png`,
      });

      await page.click('[data-screenshots="player-list-item"]', {
        delay: 50, // prevent false positive long press for `motion` handlers
      });
      await page.screenshot({
        animations: "disabled",
        path: `screenshots/${project.name}/${locale}/2-player.png`,
      });

      await page.click('[data-screenshots="player-dice-button"]');
      await page.screenshot({
        animations: "disabled",
        path: `screenshots/${project.name}/${locale}/3-dice.png`,
      });

      await delay(500);
      await page.keyboard.down("Escape");
      await delay(500);
      await page.click('[data-screenshots="combat-button"]');
      await page.screenshot({
        animations: "disabled",
        path: `screenshots/${project.name}/${locale}/4-combat.png`,
      });

      await page.goto("/");
      await page.click('[data-screenshots="settings"]');
      await page.click('[data-screenshots="single-mode-item"]');
      await page.click('[data-screenshots="back"]');
      await page.click(
        '[data-screenshots="level-counter"] [data-screenshots="increment-button"]',
        { clickCount: 4 },
      );
      await page.click(
        '[data-screenshots="gear-counter"] [data-screenshots="increment-button"]',
        { clickCount: 9 },
      );
      await page.click(
        '[data-screenshots="modifier-counter"] [data-screenshots="decrement-button"]',
        { clickCount: 4 },
      );
      await page.screenshot({
        animations: "disabled",
        path: `screenshots/${project.name}/${locale}/5-single.png`,
      });
    });
  });
}
