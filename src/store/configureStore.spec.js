import { createMemoryHistory } from 'history';

import configureStore from './configureStore';

test('should be created', () => {
  const store = configureStore({ history: createMemoryHistory() });

  expect(store).toBeTruthy();
});
