import createHistory from 'history/es/createMemoryHistory';

import createStore from '../createStore';

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

/* global test, expect */
test('should be created', () => {
  const store = createStore(createHistory());

  expect(store).toBeTruthy();
});
