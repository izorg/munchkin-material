import { GlobalStyles } from "@mui/material";
import {
  type IInsetCallbackFunc,
  type Inset,
} from "@totalpave/cordova-plugin-insets";
import { use, useEffect, useState } from "react";

// @ts-expect-error -- something wrong with library types
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access -- something wrong with library types
const insetPromise: Promise<Inset> = globalThis.totalpave.Inset.create();

export const Insets = () => {
  const inset = use(insetPromise);

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
          "--inset-bottom": `${values.bottom}px`,
          "--inset-left": `${values.left}px`,
          "--inset-right": `${values.right}px`,
          "--inset-top": `${values.top}px`,
        },
      }}
    />
  );
};
