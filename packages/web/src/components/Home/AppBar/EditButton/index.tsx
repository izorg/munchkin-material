import { mdiCheck, mdiPencilOutline } from "@mdi/js";
import { type IconButtonProps, SvgIcon, Tooltip } from "@mui/material";
import { type FC, useCallback } from "react";
import { useIntl } from "react-intl";

import useEditMode from "../../../../hooks/useEditMode";
import { useGoBack } from "../../../../utils/location";
import TopIconButton from "../../../TopIconButton";

const EditButton: FC<IconButtonProps> = (props) => {
  const goBack = useGoBack();
  const intl = useIntl();

  const { editMode, setEditMode } = useEditMode();

  const onToggleEditClick = useCallback(
    () => (editMode ? goBack() : setEditMode(true)),
    [editMode, goBack, setEditMode],
  );

  // eslint-disable-next-line formatjs/enforce-id
  const editTitle = intl.formatMessage({
    defaultMessage: "Edit",
    id: "player.list.edit",
  });

  return (
    <Tooltip title={editTitle}>
      <TopIconButton
        aria-label={editTitle}
        onClick={onToggleEditClick}
        {...props}
      >
        <SvgIcon>
          <path d={editMode ? mdiCheck : mdiPencilOutline} />
        </SvgIcon>
      </TopIconButton>
    </Tooltip>
  );
};

export default EditButton;
