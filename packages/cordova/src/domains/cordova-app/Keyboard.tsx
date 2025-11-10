import { GlobalStyles } from "@mui/material";
import { useEffect, useState } from "react";

type KeyboardEvent = {
  keyboardHeight?: number;
} & Event;

type KeyboardEventHandler = (event: KeyboardEvent) => void;

type KeyboardEventType = "keyboardWillHide" | "keyboardWillShow";

declare global {
  interface Window {
    addEventListener(
      type: KeyboardEventType,
      listener: KeyboardEventHandler,
    ): void;

    removeEventListener(
      type: KeyboardEventType,
      listener: KeyboardEventHandler,
    ): void;
  }
}

export const Keyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const onKeyboardToggle: KeyboardEventHandler = (event) => {
      setKeyboardHeight(event.keyboardHeight ?? 0);
    };

    globalThis.addEventListener("keyboardWillHide", onKeyboardToggle);
    globalThis.addEventListener("keyboardWillShow", onKeyboardToggle);

    return () => {
      globalThis.removeEventListener("keyboardWillHide", onKeyboardToggle);
      globalThis.removeEventListener("keyboardWillShow", onKeyboardToggle);
    };
  }, []);

  return (
    <GlobalStyles
      styles={{
        ":root": {
          "--keyboard-height": `${keyboardHeight}px`,
        },
      }}
    />
  );
};
