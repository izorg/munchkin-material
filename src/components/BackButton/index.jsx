import { css } from "@emotion/react";
import { useTheme } from "@material-ui/core";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "mdi-material-ui";

import { ios } from "../../utils/platforms";
import TopIconButton from "../TopIconButton";

const displayName = "BackButton";

const BackButton = (props) => {
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
    <TopIconButton color="inherit" edge="start" {...props}>
      {icon}
    </TopIconButton>
  );
};

BackButton.displayName = displayName;

export default BackButton;
