import { mdiDragHorizontalVariant } from "@mdi/js";
import {
  type ExtendButtonBaseTypeMap,
  IconButton,
  type IconButtonProps,
  type IconButtonTypeMap,
  SvgIcon,
} from "@mui/material";
import type { OverridableComponent } from "@mui/types";
import { forwardRef } from "react";

const DragIconButton: OverridableComponent<
  ExtendButtonBaseTypeMap<IconButtonTypeMap>
> = forwardRef(function DragIconButton(
  props: IconButtonProps,
  ref: IconButtonProps["ref"]
) {
  return (
    <IconButton ref={ref} {...props}>
      <SvgIcon>
        <path d={mdiDragHorizontalVariant} />
      </SvgIcon>
    </IconButton>
  );
});

export default DragIconButton;
