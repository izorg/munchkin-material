import { ListItemIcon } from "@material-ui/core";
import { Translate } from "mdi-material-ui";
import { FormattedMessage } from "react-intl";

import ListItem from "../Item";
import ListItemText from "../ItemText";

const TranslateItem = (): JSX.Element => (
  <ListItem
    button
    component="a"
    href="https://poeditor.com/join/project/ZMBvWu9xIw"
    rel="noopener noreferrer"
    target="_blank"
  >
    <ListItemIcon>
      <Translate />
    </ListItemIcon>
    <ListItemText
      primary={
        <FormattedMessage defaultMessage="Translate" id="menu.translate" />
      }
    />
  </ListItem>
);

export default TranslateItem;
