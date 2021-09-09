import { css } from "@emotion/react";
import { SvgIcon, Typography, useTheme } from "@material-ui/core";
import { mdiAccountCircle } from "@mdi/js";
import { FormattedMessage } from "react-intl";

const Nobody = (): JSX.Element => {
  const theme = useTheme();

  return (
    <div
      css={css`
        align-items: center;
        background-color: ${theme.palette.background.default};
        color: ${theme.palette.text.secondary};
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <SvgIcon
        css={css`
          height: 96px;
          margin-bottom: ${theme.spacing(2)};
          opacity: 0.2;
          width: 96px;
        `}
      >
        <path d={mdiAccountCircle} />
      </SvgIcon>
      <Typography align="center" component="div" variant="subtitle1">
        <FormattedMessage
          defaultMessage="No players in the list"
          id="player.list.empty"
        />
      </Typography>
    </div>
  );
};

export default Nobody;
