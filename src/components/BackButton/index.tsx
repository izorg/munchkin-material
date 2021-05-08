import { css } from "@emotion/react";
import { useTheme } from "@material-ui/core";
import { IconButtonProps } from "@material-ui/core/IconButton/IconButton";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "mdi-material-ui";

import { ios } from "../../utils/platforms";
import TopIconButton from "../TopIconButton";

const BackButton = (props: IconButtonProps): JSX.Element => {
  const { direction } = useTheme();

  let icon;

  if (ios) {
    const Icon = direction === "rtl" ? ChevronRight : ChevronLeft;

    icon = (
      <Icon
        css={css`
          transform: scale(1.5);
        `}
      />
    );
  } else {
    icon = direction === "rtl" ? <ArrowRight /> : <ArrowLeft />;
  }

  return (
    <TopIconButton edge="start" {...props}>
      {icon}
    </TopIconButton>
  );
};

export default BackButton;
