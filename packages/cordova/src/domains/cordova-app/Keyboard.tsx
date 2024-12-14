import { GlobalStyles } from "@mui/material";
import { useEffect, useState } from "react";

type KeyboardEventType = "keyboardWillHide" | "keyboardWillShow";

type KeyboardEvent = {
  keyboardHeight?: number;
} & Event;

type KeyboardEventHandler = (event: KeyboardEvent) => void;

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

    window.addEventListener("keyboardWillHide", onKeyboardToggle);
    window.addEventListener("keyboardWillShow", onKeyboardToggle);

    return () => {
      window.removeEventListener("keyboardWillHide", onKeyboardToggle);
      window.removeEventListener("keyboardWillShow", onKeyboardToggle);
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
