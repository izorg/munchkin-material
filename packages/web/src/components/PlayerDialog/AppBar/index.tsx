import { mdiCheck, mdiTrashCanOutline } from "@mdi/js";
import { SvgIcon, Tooltip } from "@mui/material";
import { type FC, type ReactNode } from "react";
import { useIntl } from "react-intl";

import { CloseIconButton } from "../../../domains/ui";
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
}) => {
  const intl = useIntl();

  return (
    <TopAppBar>
      <CloseIconButton
        data-screenshots="back"
        edge="start"
        onClick={onCancel}
      />

      <Title>{title}</Title>

      {onDelete && (
        <Tooltip
          key="delete"
          title={intl.formatMessage({
            defaultMessage: "Delete",
            id: "K3r6DQ",
          })}
        >
          <TopIconButton onClick={onDelete}>
            <SvgIcon>
              <path d={mdiTrashCanOutline} />
            </SvgIcon>
          </TopIconButton>
        </Tooltip>
      )}

      <TopIconButton edge="end" form={formId} type="submit">
        <SvgIcon>
          <path d={mdiCheck} />
        </SvgIcon>
      </TopIconButton>
    </TopAppBar>
  );
};

export default PlayerDialogAppBar;
