import { getLocale } from './i18n';

describe('i18n', () => {
  test('should get ru locale', () => {
    Object.defineProperty(window.navigator, 'languages', {
      configurable: true,
      get() {
        return ['ru', 'ru-RU', 'en-US', 'en'];
      },
    });

    expect(getLocale()).toBe('ru');
  });

  test('should get pt-br locale', () => {
    Object.defineProperty(window.navigator, 'languages', {
      configurable: true,
      get() {
        return ['pt-BR', 'pt', 'en-US', 'en'];
      },
    });

    expect(getLocale()).toBe('pt-br');
  });
});
