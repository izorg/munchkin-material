import { mdiChevronUp as levelIcon, mdiSword as strengthIcon } from "@mdi/js";
import { Box, ListItemText, SvgIcon } from "@mui/material";
import { type VFC } from "react";

import { playerShape } from "../../utils/propTypes";
import { type Player } from "../../utils/types";
import SexIcon from "../SexIcon";

type PlayerListItemTextProps = {
  player: Player;
};

const PlayerListItemText: VFC<PlayerListItemTextProps> = ({ player }) => (
  <>
    <ListItemText
      primary={player.name}
      primaryTypographyProps={{
        sx: {
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      }}
      secondary={
        <SexIcon
          sex={player.sex}
          sx={{
            fontSize: "1em",
          }}
        />
      }
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    />
    <ListItemText
      primaryTypographyProps={{
        sx: {
          fontWeight: "regular",
        },
        variant: "h6",
      }}
      sx={{
        flexGrow: 0,
        flexShrink: 0,
        paddingLeft: 1,
      }}
    >
      <Box
        component="span"
        sx={{
          alignItems: "center",
          display: "inline-flex",
          justifyContent: "flex-end",
          width: 50,
        }}
      >
        {player.level}
        <SvgIcon>
          <path d={levelIcon} />
        </SvgIcon>
      </Box>

      <Box
        component="span"
        sx={{
          alignItems: "center",
          display: "inline-flex",
          justifyContent: "flex-end",
          width: 60,
        }}
      >
        {player.level + player.gear}
        <SvgIcon
          sx={{
            fontSize: "1.2em",
            marginLeft: 0.5,
          }}
        >
          <path d={strengthIcon} />
        </SvgIcon>
      </Box>
    </ListItemText>
  </>
);

PlayerListItemText.propTypes = {
  player: playerShape.isRequired,
};

export default PlayerListItemText;
