/* global expect, test */
import createHistory from 'history/es/createMemoryHistory';

import configureStore from '../configureStore';

test('should be created', () => {
  const store = configureStore(createHistory());

  expect(store).toBeTruthy();
});
