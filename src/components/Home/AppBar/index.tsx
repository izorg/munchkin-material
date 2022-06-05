import { mdiClose, mdiFlagCheckered, mdiTrashCanOutline } from "@mdi/js";
import { SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import { cloneElement, type ReactNode, type VFC } from "react";
import { FormattedMessage } from "react-intl";

import { setCombatPlayerBonus } from "../../../ducks/combat";
import { useAppDispatch } from "../../../store";
import { useGoBack } from "../../../utils/location";
import useDeletePlayers from "../../../utils/useDeletePlayers";
import useEditMode from "../../../utils/useEditMode";
import useMultiMode from "../../../utils/useMultiMode";
import usePresentSelector from "../../../utils/usePresentSelector";
import DiceButton from "../../DiceButton";
import SettingsIconButton from "../../SettingsIconButton";
import Title from "../../Title";
import TopAppBar from "../../TopAppBar";
import TopIconButton from "../../TopIconButton";

import EditButton from "./EditButton";
import ResetButton from "./ResetButton";
import ShuffleButton from "./ShuffleButton";

type HomeAppBarProps = {
  empty: boolean;
  singleMode: boolean;
};

const HomeAppBar: VFC<HomeAppBarProps> = (props) => {
  const { empty, singleMode } = props;
  const dispatch = useAppDispatch();

  const deletePlayers = useDeletePlayers();
  const goBack = useGoBack();

  const { editMode } = useEditMode();
  const { multiMode } = useMultiMode();

  const selectedPlayerIds = usePresentSelector(
    (state) => state.ui.selectedPlayerIds
  );

  const onMultiSelectDeactivate = () => goBack();

  const onPlayersDelete = (selected: string[]) => {
    deletePlayers(selected);
    goBack();
  };

  const onTurnFinish = () => dispatch(setCombatPlayerBonus(0));

  let title: ReactNode = (
    <FormattedMessage defaultMessage="Munchkins" id="player.list.title" />
  );

  if (multiMode) {
    title = selectedPlayerIds.length;
  }

  if (singleMode) {
    title = (
      <FormattedMessage defaultMessage="Munchkin" id="home.single.title" />
    );
  }

  let buttons = [
    !empty && <ResetButton key="reset" />,
    !empty && <EditButton key="edit" />,
    <DiceButton key="dice" />,
    <SettingsIconButton key="settings" />,
  ].filter((item): item is JSX.Element => item !== false);

  if (editMode) {
    buttons = [<ShuffleButton key="shuffle" />, <EditButton key="save" />];
  }

  if (multiMode) {
    buttons = [
      <TopIconButton
        key="delete"
        onClick={() => onPlayersDelete(selectedPlayerIds)}
      >
        <SvgIcon>
          <path d={mdiTrashCanOutline} />
        </SvgIcon>
      </TopIconButton>,
    ];
  }

  if (singleMode) {
    buttons = [
      <ResetButton key="reset" />,
      <TopIconButton key="finish" onClick={onTurnFinish}>
        <SvgIcon>
          <path d={mdiFlagCheckered} />
        </SvgIcon>
      </TopIconButton>,
      <DiceButton key="dice" />,
      <SettingsIconButton key="settings" />,
    ];
  }

  buttons[buttons.length - 1] = cloneElement(buttons[buttons.length - 1], {
    edge: "end",
  });

  return (
    <TopAppBar>
      {multiMode && (
        <TopIconButton edge="start" onClick={onMultiSelectDeactivate}>
          <SvgIcon>
            <path d={mdiClose} />
          </SvgIcon>
        </TopIconButton>
      )}

      <Title sx={[!multiMode && { paddingLeft: { xs: 0 } }]}>{title}</Title>

      {buttons}
    </TopAppBar>
  );
};

HomeAppBar.propTypes = {
  empty: PropTypes.bool.isRequired,
  singleMode: PropTypes.bool.isRequired,
};

export default HomeAppBar;
