import { mdiCheck, mdiPencilOutline } from "@mdi/js";
import { type IconButtonProps, SvgIcon, Tooltip } from "@mui/material";
import { type VFC } from "react";
import { useIntl } from "react-intl";

import { useGoBack } from "../../../../utils/location";
import useEditMode from "../../../../utils/useEditMode";
import TopIconButton from "../../../TopIconButton";

const EditButton: VFC<IconButtonProps> = (props) => {
  const goBack = useGoBack();
  const intl = useIntl();

  const { editMode, setEditMode } = useEditMode();

  const onToggleEditClick = () => (editMode ? goBack() : setEditMode(true));

  const editTitle = intl.formatMessage({
    defaultMessage: "Edit",
    id: "player.list.edit",
  });

  return (
    <Tooltip title={editTitle}>
      <TopIconButton
        aria-label={editTitle}
        onClick={() => onToggleEditClick()}
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
