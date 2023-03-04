import { mdiAccountCircle } from "@mdi/js";
import { Box, SvgIcon, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";

const Nobody = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.secondary,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <SvgIcon
        sx={{
          height: "96px",
          marginBottom: theme.spacing(2),
          opacity: 0.2,
          width: "96px",
        }}
      >
        <path d={mdiAccountCircle} />
      </SvgIcon>
      <Typography align="center" component="div" variant="subtitle1">
        <FormattedMessage
          defaultMessage="No players in the list"
          id="player.list.empty"
        />
      </Typography>
    </Box>
  );
};

export default Nobody;
