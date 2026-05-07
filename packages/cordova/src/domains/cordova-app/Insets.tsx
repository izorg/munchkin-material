import { GlobalStyles } from "@mui/material";
import { type IInsetCallbackFunc } from "@totalpave/cordova-plugin-insets";
import { use, useEffect, useState } from "react";

const insetPromise = globalThis.totalpave.Inset.create();

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

  console.log("=== values ===", values);

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
