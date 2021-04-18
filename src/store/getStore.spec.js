import { createMemoryHistory } from "history";

import getStore from "./getStore";

test("should be created", () => {
  const store = getStore({ history: createMemoryHistory() });

  expect(store).toBeTruthy();
});
