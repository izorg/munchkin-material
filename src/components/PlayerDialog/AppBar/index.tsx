import { mdiCheck, mdiDelete } from "@mdi/js";
import { SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import type { ReactNode, VFC } from "react";

import BackButton from "../../BackButton";
import Title from "../../Title";
import TopAppBar from "../../TopAppBar";
import TopIconButton from "../../TopIconButton";

type PlayerDialogAppBarProps = {
  onCancel?: () => void;
  onDelete?: () => void;
  title: ReactNode;
};

const PlayerDialogAppBar: VFC<PlayerDialogAppBarProps> = ({
  onCancel,
  onDelete,
  title,
}) => (
  <TopAppBar>
    <BackButton onClick={onCancel} />

    <Title>{title}</Title>

    {onDelete && (
      <TopIconButton edge="end" onClick={onDelete}>
        <SvgIcon>
          <path d={mdiDelete} />
        </SvgIcon>
      </TopIconButton>
    )}

    <TopIconButton edge="end" type="submit">
      <SvgIcon>
        <path d={mdiCheck} />
      </SvgIcon>
    </TopIconButton>
  </TopAppBar>
);

PlayerDialogAppBar.propTypes = {
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  title: PropTypes.node.isRequired,
};

export default PlayerDialogAppBar;
