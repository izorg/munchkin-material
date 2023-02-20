interface Window {
  Keyboard?: Keyboard;
}

interface Keyboard {
  setKeyboardStyle: (color: string) => void;
}

declare var Keyboard: Keyboard;
