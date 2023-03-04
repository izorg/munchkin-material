import { Box, type BoxProps, useTheme } from "@mui/material";
import { useIntl } from "react-intl";

import { EN, RU } from "../../../i18n";

const munchkinFontSupportedLocales = [EN, RU];

const CounterLabel = ({ sx = [], ...props }: BoxProps) => {
  const { locale } = useIntl();
  const theme = useTheme();

  const fontFamily = munchkinFontSupportedLocales.includes(locale)
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
        ...(sx instanceof Array ? sx : [sx]),
      ]}
      {...props}
    />
  );
};

export default CounterLabel;
