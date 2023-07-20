import { mdiTranslate } from "@mdi/js";
import { ListItemIcon, SvgIcon } from "@mui/material";
import { FormattedMessage } from "react-intl";

import ListItem from "../Item";
import ListItemText from "../ItemText";

const TranslateItem = () => (
  <ListItem
    component="a"
    href="https://poeditor.com/join/project/ZMBvWu9xIw"
    rel="noopener noreferrer"
    target="_blank"
  >
    <ListItemIcon>
      <SvgIcon>
        <path d={mdiTranslate} />
      </SvgIcon>
    </ListItemIcon>
    <ListItemText
      primary={
        <FormattedMessage defaultMessage="Translate" id="menu.translate" />
      }
    />
  </ListItem>
);

export default TranslateItem;
