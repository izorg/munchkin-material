import { mdiCheck, mdiTrashCanOutline } from "@mdi/js";
import { SvgIcon } from "@mui/material";
import { type FC, type ReactNode } from "react";

import BackButton from "../../BackButton";
import Title from "../../Title";
import TopAppBar from "../../TopAppBar";
import TopIconButton from "../../TopIconButton";
import formId from "../formId";

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
      <TopIconButton onClick={onDelete}>
        <SvgIcon>
          <path d={mdiTrashCanOutline} />
        </SvgIcon>
      </TopIconButton>
    )}

    <TopIconButton edge="end" form={formId} type="submit">
      <SvgIcon>
        <path d={mdiCheck} />
      </SvgIcon>
    </TopIconButton>
  </TopAppBar>
);

export default PlayerDialogAppBar;
