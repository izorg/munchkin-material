import { SvgIcon } from "@material-ui/core";
import { mdiClose, mdiDelete, mdiFlagCheckered } from "@mdi/js";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import DiceButton from "../../../components/dice/Button";
import Title from "../../../components/Title";
import TopAppBar from "../../../components/TopAppBar";
import TopIconButton from "../../../components/TopIconButton";
import { setCombatPlayerBonus } from "../../../ducks/combat";
import { useGoBack, useLocationQuery } from "../../../utils/location";
import useDeletePlayers from "../../../utils/useDeletePlayers";
import { EDIT, MULTI } from "../modes";

import EditButton from "./EditButton";
import MenuButton from "./MenuButton";
import ResetButton from "./ResetButton";
import ShuffleButton from "./ShuffleButton";

const displayName = "HomeAppBar";

const HomeAppBar = ({ empty, singleMode }) => {
  const dispatch = useDispatch();

  const deletePlayers = useDeletePlayers();
  const goBack = useGoBack();
  const query = useLocationQuery();

  const editMode = query[EDIT] !== undefined;
  const multiMode = query[MULTI] !== undefined;

  const selectedPlayerIds = useSelector(
    (state) => state.present.ui.selectedPlayerIds
  );

  const onMultiSelectDeactivate = () => goBack();

  const onPlayersDelete = (selected) => {
    deletePlayers(selected);
    goBack();
  };

  const onTurnFinish = () => dispatch(setCombatPlayerBonus(0));

  let title = (
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

      {(singleMode || (!(editMode || multiMode) && !empty)) && (
        <ResetButton edge="end" />
      )}

      {(!(editMode || multiMode) || singleMode) && <DiceButton edge="end" />}

      {editMode && <ShuffleButton edge="end" />}

      {!empty && !multiMode && !singleMode && <EditButton />}

      {multiMode && (
        <TopIconButton
          edge="end"
          onClick={() => onPlayersDelete(selectedPlayerIds)}
        >
          <SvgIcon>
            <path d={mdiDelete} />
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

HomeAppBar.displayName = displayName;

export default HomeAppBar;
