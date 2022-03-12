import { mdiCheck, mdiPencilOutline } from "@mdi/js";
import { SvgIcon, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";

import TopIconButton from "../../../../components/TopIconButton";
import { useGoBack } from "../../../../utils/location";
import useEditMode from "../../../../utils/useEditMode";

const EditButton = () => {
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
        edge="end"
        onClick={() => onToggleEditClick()}
      >
        <SvgIcon>
          <path d={editMode ? mdiCheck : mdiPencilOutline} />
        </SvgIcon>
      </TopIconButton>
    </Tooltip>
  );
};

export default EditButton;
