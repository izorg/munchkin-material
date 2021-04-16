import { Tooltip } from "@material-ui/core";
import { Check, Pencil } from "mdi-material-ui";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import TopIconButton from "../../../../components/TopIconButton";
import {
  stringifyQuery,
  useGoBack,
  useLocationQuery,
} from "../../../../utils/location";
import { EDIT } from "../../modes";

const EditButton = () => {
  const goBack = useGoBack();
  const intl = useIntl();
  const query = useLocationQuery();
  const navigate = useNavigate();

  const editMode = query[EDIT] !== undefined;

  const onToggleEditClick = () =>
    editMode
      ? goBack()
      : navigate({
          ...location,
          search: stringifyQuery({ [EDIT]: null }),
        });

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
        {editMode ? <Check /> : <Pencil />}
      </TopIconButton>
    </Tooltip>
  );
};

export default EditButton;
