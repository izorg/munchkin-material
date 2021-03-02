import { Tooltip } from "@material-ui/core";
import { Check, Close, Delete, FlagCheckered, Pencil } from "mdi-material-ui";
import PropTypes from "prop-types";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import DiceButton from "../../../components/dice/Button";
import Title from "../../../components/Title";
import TopAppBar from "../../../components/TopAppBar";
import TopIconButton from "../../../components/TopIconButton";
import { setCombatPlayerBonus } from "../../../ducks/combat";
import {
  stringifyQuery,
  useGoBack,
  useLocationQuery,
} from "../../../utils/location";
import useDeletePlayers from "../../../utils/useDeletePlayers";
import { EDIT, MULTI } from "../modes";

import MenuButton from "./MenuButton";
import ResetButton from "./ResetButton";
import ShuffleButton from "./ShuffleButton";

const displayName = "HomeAppBar";

const messages = defineMessages({
  edit: {
    defaultMessage: "Edit",
    id: "player.list.edit",
  },
});

const HomeAppBar = ({ empty, singleMode }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();

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

  const onToggleEditClick = () =>
    editMode
      ? goBack()
      : navigate({
          ...location,
          search: stringifyQuery({ [EDIT]: null }),
        });

  const onTurnFinish = () => dispatch(setCombatPlayerBonus(0));

  const editTitle = intl.formatMessage(messages.edit);

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
          <Close />
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

      {!empty && !multiMode && !singleMode && (
        <Tooltip title={editTitle}>
          <TopIconButton
            aria-label={editTitle}
            edge="end"
            onClick={() => onToggleEditClick()}
          >
            {editMode ? <Check /> : <Pencil />}
          </TopIconButton>
        </Tooltip>
      )}

      {multiMode && (
        <TopIconButton
          edge="end"
          onClick={() => onPlayersDelete(selectedPlayerIds)}
        >
          <Delete />
        </TopIconButton>
      )}

      {singleMode && (
        <TopIconButton edge="end" onClick={onTurnFinish}>
          <FlagCheckered />
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
