import { mdiShuffle } from "@mdi/js";
import { type IconButtonProps, SvgIcon, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";

import TopIconButton from "../../../../components/TopIconButton";
import { shufflePlayers } from "../../../../ducks/playerList";
import { useAppDispatch } from "../../../../store";

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
