import { mdiShuffleVariant } from "@mdi/js";
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
      title={
        // eslint-disable-next-line formatjs/enforce-id
        intl.formatMessage({
          defaultMessage: "Shuffle players",
          id: "player.list.shuffle",
        })
      }
    >
      <TopIconButton onClick={() => dispatch(shufflePlayers())} {...props}>
        <SvgIcon>
          <path d={mdiShuffleVariant} />
        </SvgIcon>
      </TopIconButton>
    </Tooltip>
  );
};

export default ShuffleButton;
