import { mdiClose, mdiFlagCheckered, mdiTrashCanOutline } from "@mdi/js";
import { SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import { cloneElement, type ReactNode, type VFC } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";

import DiceButton from "../../../components/dice/Button";
import SettingsIconButton from "../../../components/SettingsIconButton";
import Title from "../../../components/Title";
import TopAppBar from "../../../components/TopAppBar";
import TopIconButton from "../../../components/TopIconButton";
import { setCombatPlayerBonus } from "../../../ducks/combat";
import { useGoBack } from "../../../utils/location";
import useDeletePlayers from "../../../utils/useDeletePlayers";
import useEditMode from "../../../utils/useEditMode";
import useMultiMode from "../../../utils/useMultiMode";
import usePresentSelector from "../../../utils/usePresentSelector";

import EditButton from "./EditButton";
import ResetButton from "./ResetButton";
import ShuffleButton from "./ShuffleButton";

type HomeAppBarProps = {
  empty: boolean;
  singleMode: boolean;
};

const HomeAppBar: VFC<HomeAppBarProps> = (props) => {
  const { empty, singleMode } = props;
  const dispatch = useDispatch();

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

  const buttons = [
    !editMode && !multiMode && <SettingsIconButton key="settings" />,
    (singleMode || (!(editMode || multiMode) && !empty)) && (
      <ResetButton key="reset" />
    ),
    (!(editMode || multiMode) || singleMode) && <DiceButton key="dice" />,
    editMode && <ShuffleButton />,
    !empty && !multiMode && !singleMode && <EditButton key="edit" />,
    multiMode && (
      <TopIconButton
        key="delete"
        onClick={() => onPlayersDelete(selectedPlayerIds)}
      >
        <SvgIcon>
          <path d={mdiTrashCanOutline} />
        </SvgIcon>
      </TopIconButton>
    ),
    singleMode && (
      <TopIconButton key="finish" onClick={onTurnFinish}>
        <SvgIcon>
          <path d={mdiFlagCheckered} />
        </SvgIcon>
      </TopIconButton>
    ),
  ].filter((item): item is JSX.Element => item !== false);

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
