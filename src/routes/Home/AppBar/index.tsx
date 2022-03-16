import { mdiClose, mdiFlagCheckered, mdiTrashCanOutline } from "@mdi/js";
import { SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import { type ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";

import DiceButton from "../../../components/dice/Button";
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
import MenuButton from "./MenuButton";
import ResetButton from "./ResetButton";
import ShuffleButton from "./ShuffleButton";

type HomeAppBarProps = {
  empty: boolean;
  singleMode: boolean;
};

const HomeAppBar = ({ empty, singleMode }: HomeAppBarProps) => {
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

  return (
    <TopAppBar>
      {multiMode ? (
        <TopIconButton edge="start" onClick={onMultiSelectDeactivate}>
          <SvgIcon>
            <path d={mdiClose} />
          </SvgIcon>
        </TopIconButton>
      ) : (
        <MenuButton edge="start" />
      )}

      <Title>{title}</Title>

      {(singleMode || (!(editMode || multiMode) && !empty)) && <ResetButton />}

      {(!(editMode || multiMode) || singleMode) && <DiceButton />}

      {editMode && <ShuffleButton />}

      {!empty && !multiMode && !singleMode && <EditButton />}

      {multiMode && (
        <TopIconButton
          edge="end"
          onClick={() => onPlayersDelete(selectedPlayerIds)}
        >
          <SvgIcon>
            <path d={mdiTrashCanOutline} />
          </SvgIcon>
        </TopIconButton>
      )}

      {singleMode && (
        <TopIconButton edge="end" onClick={onTurnFinish}>
          <SvgIcon>
            <path d={mdiFlagCheckered} />
          </SvgIcon>
        </TopIconButton>
      )}
    </TopAppBar>
  );
};

HomeAppBar.propTypes = {
  empty: PropTypes.bool,
  singleMode: PropTypes.bool,
};

HomeAppBar.defaultProps = {
  empty: false,
  singleMode: false,
};

export default HomeAppBar;
