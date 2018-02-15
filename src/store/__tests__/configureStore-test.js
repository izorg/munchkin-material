import createHistory from 'history/createMemoryHistory';

import configureStore from '../configureStore';

test('should be created', () => {
  const store = configureStore({ history: createHistory() });

  expect(store).toBeTruthy();
});
