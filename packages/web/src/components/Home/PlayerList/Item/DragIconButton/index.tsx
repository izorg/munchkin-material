import { mdiDragHorizontalVariant } from "@mdi/js";
import { IconButton, type IconButtonProps, SvgIcon } from "@mui/material";

export const DragIconButton = (props: Omit<IconButtonProps, "children">) => (
  <IconButton {...props}>
    <SvgIcon>
      <path d={mdiDragHorizontalVariant} />
    </SvgIcon>
  </IconButton>
);
