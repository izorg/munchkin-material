import { ClassNames, css } from "@emotion/react";
import { ListItemText, useTheme } from "@material-ui/core";
import { ChevronUp as LevelIcon, Sword as StrengthIcon } from "mdi-material-ui";

import { playerShape } from "../../utils/propTypes";
import Sex from "../Sex";

const PlayerListItemText = ({ player }) => {
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
            secondary={<Sex css={sexCss} sex={player.sex} />}
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
              <LevelIcon />
            </span>

            <span css={strengthCss}>
              {player.level + player.gear}
              <StrengthIcon css={strengthIconCss} />
            </span>
          </ListItemText>
        </>
      )}
    </ClassNames>
  );
};

PlayerListItemText.propTypes = {
  player: playerShape.isRequired,
};

export default PlayerListItemText;
