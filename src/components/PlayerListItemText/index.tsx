import { ClassNames, css } from "@emotion/react";
import { mdiChevronUp as levelIcon, mdiSword as strengthIcon } from "@mdi/js";
import { ListItemText, SvgIcon, useTheme } from "@mui/material";
import { type FC } from "react";

import { playerShape } from "../../utils/propTypes";
import { type Player } from "../../utils/types";
import SexIcon from "../Sex";

type PlayerListItemTextProps = {
  player: Player;
};

const PlayerListItemText: FC<PlayerListItemTextProps> = ({ player }) => {
  const theme = useTheme();

  const mainCss = css`
    display: flex;
    flex-direction: column;
  `;

  const sexCss = css`
    font-size: 1em;
  `;

  const levelCss = css`
    align-items: center;
    display: inline-flex;
    justify-content: flex-end;
    width: 50px;
  `;

  const strengthCss = css`
    align-items: center;
    display: inline-flex;
    justify-content: flex-end;
    width: 60px;
  `;

  const strengthIconCss = css`
    font-size: 1.2em;
    margin-left: 4px;
  `;

  const statsCss = css`
    flex-grow: 0;
    flex-shrink: 0;
    padding-left: ${theme.spacing(1)};
  `;

  return (
    <ClassNames>
      {({ css }) => (
        <>
          <ListItemText
            css={mainCss}
            primary={player.name}
            primaryTypographyProps={{
              className: css`
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              `,
            }}
            secondary={<SexIcon css={sexCss} sex={player.sex} />}
          />
          <ListItemText
            css={statsCss}
            primaryTypographyProps={{
              className: css`
                font-weight: ${theme.typography.fontWeightRegular};
              `,
              variant: "h6",
            }}
          >
            <span css={levelCss}>
              {player.level}
              <SvgIcon>
                <path d={levelIcon} />
              </SvgIcon>
            </span>

            <span css={strengthCss}>
              {player.level + player.gear}
              <SvgIcon css={strengthIconCss}>
                <path d={strengthIcon} />
              </SvgIcon>
            </span>
          </ListItemText>
        </>
      )}
    </ClassNames>
  );
};

PlayerListItemText.propTypes = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  player: playerShape.isRequired,
};

export default PlayerListItemText;
