import { Check, Delete } from "mdi-material-ui";
import PropTypes from "prop-types";

import BackButton from "../../BackButton";
import Title from "../../Title";
import TopAppBar from "../../TopAppBar";
import TopIconButton from "../../TopIconButton";

const displayName = "PlayerDialogAppBar";

const PlayerDialogAppBar = ({ onCancel, onDelete, title }) => {
  return (
    <TopAppBar>
      <BackButton onClick={onCancel} />

      <Title>{title}</Title>

      {onDelete && (
        <TopIconButton edge="end" onClick={onDelete}>
          <Delete />
        </TopIconButton>
      )}

      <TopIconButton edge="end" type="submit">
        <Check />
      </TopIconButton>
    </TopAppBar>
  );
};

PlayerDialogAppBar.propTypes = {
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  title: PropTypes.node,
};

PlayerDialogAppBar.displayName = displayName;

export default PlayerDialogAppBar;
