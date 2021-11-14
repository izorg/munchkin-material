import { mdiShuffle } from "@mdi/js";
import { IconButtonProps, SvgIcon, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";

import TopIconButton from "../../../../components/TopIconButton";
import { shufflePlayers } from "../../../../ducks/playerList";

const ShuffleButton = (props: IconButtonProps) => {
  const dispatch = useDispatch();
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
