import createHistory from 'history/createMemoryHistory';

import configureStore from '../configureStore';

test('should be created', () => {
  const store = configureStore(createHistory());

  expect(store).toBeTruthy();
});
