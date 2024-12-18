import { mdiChevronUp as levelIcon, mdiSword as strengthIcon } from "@mdi/js";
import { Box, ListItemText, SvgIcon } from "@mui/material";
import { type FC } from "react";
import { FormattedNumber } from "react-intl";

import { type Player } from "../../domains/player";
import SexIcon from "../SexIcon";

type PlayerListItemTextProps = {
  player: Player;
};

const PlayerListItemText: FC<PlayerListItemTextProps> = ({ player }) => (
  <>
    <ListItemText
      primary={player.name}
      secondary={
        <SexIcon
          sex={player.sex}
          sx={{
            fontSize: "1em",
          }}
        />
      }
      slotProps={{
        primary: {
          sx: {
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        },
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    />
    <ListItemText
      slotProps={{
        primary: {
          sx: {
            fontWeight: "regular",
          },
          variant: "h6",
        },
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
        <FormattedNumber value={player.level} />
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
        <FormattedNumber value={player.level + player.gear} />
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

export default PlayerListItemText;
