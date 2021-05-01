import { css } from "@emotion/react";
import { Typography, useTheme } from "@material-ui/core";
import { AccountCircle } from "mdi-material-ui";
import { FormattedMessage } from "react-intl";

const displayName = "Nobody";

const Nobody = () => {
  const theme = useTheme();

  return (
    <div
      css={css`
        align-items: center;
        color: ${theme.palette.text.secondary};
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <AccountCircle
        css={css`
          height: 96px;
          margin-bottom: ${theme.spacing(2)};
          opacity: 0.2;
          width: 96px;
        `}
      />
      <Typography
        align="center"
        color="inherit"
        component="div"
        variant="subtitle1"
      >
        <FormattedMessage
          defaultMessage="No players in the list"
          id="player.list.empty"
        />
      </Typography>
    </div>
  );
};

Nobody.displayName = displayName;

export default Nobody;
