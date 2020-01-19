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

  test('should get ru locale from ru-RU language', () => {
    Object.defineProperty(window.navigator, 'languages', {
      configurable: true,
      get() {
        return ['ru-RU'];
      },
    });

    expect(getLocale()).toBe('ru');
  });

  test('should get pt locale from pt-PT language', () => {
    Object.defineProperty(window.navigator, 'languages', {
      configurable: true,
      get() {
        return ['pt-PT', 'pt-BR', 'ru-RU', 'en-US'];
      },
    });

    expect(getLocale()).toBe('pt');
  });

  test('should get pt-BR locale', () => {
    Object.defineProperty(window.navigator, 'languages', {
      configurable: true,
      get() {
        return ['pt-BR', 'pt', 'en-US', 'en'];
      },
    });

    expect(getLocale()).toBe('pt-BR');
  });
});
