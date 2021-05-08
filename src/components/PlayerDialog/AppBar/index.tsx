import { Check, Delete } from "mdi-material-ui";
import PropTypes from "prop-types";
import type { FC, ReactNode } from "react";

import BackButton from "../../BackButton";
import Title from "../../Title";
import TopAppBar from "../../TopAppBar";
import TopIconButton from "../../TopIconButton";

type PlayerDialogAppBarProps = {
  onCancel?: () => void;
  onDelete?: () => void;
  title: ReactNode;
};

const PlayerDialogAppBar: FC<PlayerDialogAppBarProps> = ({
  onCancel,
  onDelete,
  title,
}) => (
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

PlayerDialogAppBar.propTypes = {
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  title: PropTypes.node,
};

export default PlayerDialogAppBar;
