import { mdiSkull } from "@mdi/js";
import { type IconButtonProps, SvgIcon, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { type VFC } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";

import TopIconButton from "../../../../components/TopIconButton";
import { useUndo } from "../../../../components/UndoProvider";
import { killPlayer } from "../../../../ducks/players";
import usePresentSelector from "../../../../utils/usePresentSelector";

type KillPlayerButtonProps = {
  playerId: string;
} & IconButtonProps;

const KillPlayerButton: VFC<KillPlayerButtonProps> = ({
  playerId,
  ...props
}) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const { setMessage } = useUndo();

  const players = usePresentSelector((state) => state.players);
  const disabled = players[playerId].gear === 0;

  const onClick = () => {
    const player = players[playerId];

    setMessage(
      intl.formatMessage(
        {
          defaultMessage:
            "{name} {sex, select, female {has died} male {has died} other {}}",
          id: "undo.killPlayer",
        },
        {
          name: player.name,
          sex: player.sex,
        }
      )
    );
    dispatch(killPlayer(playerId));
  };

  const button = (
    <TopIconButton disabled={disabled} onClick={onClick} {...props}>
      <SvgIcon>
        <path d={mdiSkull} />
      </SvgIcon>
    </TopIconButton>
  );

  if (disabled) {
    return button;
  }

  return (
    <Tooltip
      title={intl.formatMessage({
        defaultMessage: "Kill",
        id: "kill",
      })}
    >
      {button}
    </Tooltip>
  );
};

KillPlayerButton.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default KillPlayerButton;
