import { mdiShuffle } from "@mdi/js";
import { type IconButtonProps, SvgIcon, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";

import { shufflePlayers } from "../../../../ducks/playerList";
import { useAppDispatch } from "../../../../store";
import TopIconButton from "../../../TopIconButton";

const ShuffleButton = (props: IconButtonProps) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();

  return (
    <Tooltip
      title={intl.formatMessage({
        defaultMessage: "Shuffle players",
        id: "player.list.shuffle",
      })}
    >
      <TopIconButton onClick={() => dispatch(shufflePlayers())} {...props}>
        <SvgIcon>
          <path d={mdiShuffle} />
        </SvgIcon>
      </TopIconButton>
    </Tooltip>
  );
};

export default ShuffleButton;
