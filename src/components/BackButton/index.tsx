import {
  mdiArrowLeft,
  mdiArrowRight,
  mdiChevronLeft,
  mdiChevronRight,
} from "@mdi/js";
import { type IconButtonProps, SvgIcon, useTheme } from "@mui/material";

import { ios } from "../../utils/platforms";
import TopIconButton from "../TopIconButton";

const BackButton = (props: IconButtonProps) => {
  const { direction } = useTheme();

  let icon;

  if (ios) {
    icon = (
      <SvgIcon
        sx={{
          transform: "scale(1.5)",
        }}
      >
        <path d={direction === "rtl" ? mdiChevronRight : mdiChevronLeft} />
      </SvgIcon>
    );
  } else {
    icon = (
      <SvgIcon>
        <path d={direction === "rtl" ? mdiArrowRight : mdiArrowLeft} />
      </SvgIcon>
    );
  }

  return (
    <TopIconButton data-screenshots="back" edge="start" {...props}>
      {icon}
    </TopIconButton>
  );
};

export default BackButton;
