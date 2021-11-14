import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { useIntl } from "react-intl";

import { EN, RU } from "../../../i18n";

const munchkinFontSupportedLocales = [EN, RU];

const CounterLabel = (
  props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>
) => {
  const { locale } = useIntl();
  const theme = useTheme();

  const fontFamily = munchkinFontSupportedLocales.includes(locale)
    ? `"Munchkin", ${String(theme.typography.fontFamily)}`
    : theme.typography.fontFamily;

  return (
    <div
      css={css`
        font-family: ${fontFamily};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `}
      {...props}
    />
  );
};

export default CounterLabel;
