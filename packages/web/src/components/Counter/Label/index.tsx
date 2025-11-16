import { Box, type BoxProps, useTheme } from "@mui/material";
import { useIntl } from "react-intl";

import { EN, RU } from "../../../domains/i18n";

const munchkinFontSupportedLocales = new Set([EN, RU]);

const CounterLabel = ({ sx = [], ...props }: BoxProps) => {
  const { locale } = useIntl();
  const theme = useTheme();

  const fontFamily = munchkinFontSupportedLocales.has(locale)
    ? `"Munchkin", ${String(theme.typography.fontFamily)}`
    : theme.typography.fontFamily;

  return (
    <Box
      sx={[
        {
          fontFamily,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
        ...[sx].flat(),
      ]}
      {...props}
    />
  );
};

export default CounterLabel;
