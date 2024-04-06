import { mdiAccountCircle } from "@mdi/js";
import { Box, SvgIcon, type SxProps, Typography } from "@mui/material";
import { type FC } from "react";
import { FormattedMessage } from "react-intl";

type NobodyProps = {
  sx?: SxProps;
};

const Nobody: FC<NobodyProps> = ({ sx = [] }) => (
  <Box
    sx={[
      (theme) => ({
        alignItems: "center",
        color: theme.palette.text.secondary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }),
      ...(sx instanceof Array ? sx : [sx]),
    ]}
  >
    <SvgIcon
      sx={{
        height: "96px",
        marginBottom: 2,
        opacity: 0.2,
        width: "96px",
      }}
    >
      <path d={mdiAccountCircle} />
    </SvgIcon>
    <Typography component="span" variant="subtitle1">
      {/* eslint-disable-next-line formatjs/enforce-id */}
      <FormattedMessage
        defaultMessage="No players in the list"
        id="player.list.empty"
      />
    </Typography>
  </Box>
);

export default Nobody;
