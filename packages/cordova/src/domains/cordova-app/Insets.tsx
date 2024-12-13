/// <reference types="cordova-plugin-android-bars" />

import { GlobalStyles } from "@mui/material";
import {
  type IInsetCallbackFunc,
  type Inset,
} from "@totalpave/cordova-plugin-insets";
import { use, useEffect, useState } from "react";

// @ts-expect-error -- something wrong with library types
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
const insetPromise: Promise<Inset> = window.totalpave.Inset.create();

const fullScreenPromise = new Promise((resolve) => {
  cordova.plugins.AndroidBars.isFullScreen(({ is }: { is: boolean }) =>
    resolve(is),
  );
});

export const Insets = () => {
  const inset = use(insetPromise);

  const fullScreen = use(fullScreenPromise);

  const [values, setValues] = useState(() => inset.getInset());

  useEffect(() => {
    const onChange: IInsetCallbackFunc = (inset) => {
      setValues(inset);
    };

    inset.addListener(onChange);

    return () => {
      inset.removeListener(onChange);
    };
  }, [inset]);

  return (
    <GlobalStyles
      styles={{
        ":root": {
          "--inset-bottom": `${fullScreen ? values.bottom : 0}px`,
          "--inset-left": `${fullScreen ? values.left : 0}px`,
          "--inset-right": `${fullScreen ? values.right : 0}px`,
          "--inset-top": `${fullScreen ? values.top : 0}px`,
        },
      }}
    />
  );
};
