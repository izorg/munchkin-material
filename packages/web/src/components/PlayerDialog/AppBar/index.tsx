import { mdiCheck } from "@mdi/js";
import { SvgIcon } from "@mui/material";
import { type FC, type ReactNode } from "react";

import { CloseIconButton } from "../../../domains/ui";
import Title from "../../Title";
import TopAppBar from "../../TopAppBar";
import TopIconButton from "../../TopIconButton";
import formId from "../formId";

type PlayerDialogAppBarProps = {
  onCancel?: () => void;
  title: ReactNode;
};

const PlayerDialogAppBar: FC<PlayerDialogAppBarProps> = ({
  onCancel,
  title,
}) => {
  return (
    <TopAppBar>
      <CloseIconButton
        data-screenshots="back"
        edge="start"
        onClick={onCancel}
      />

      <Title>{title}</Title>

      <TopIconButton edge="end" form={formId} type="submit">
        <SvgIcon>
          <path d={mdiCheck} />
        </SvgIcon>
      </TopIconButton>
    </TopAppBar>
  );
};

export default PlayerDialogAppBar;
