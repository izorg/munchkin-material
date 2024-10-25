import {
  mdiArrowLeft,
  mdiArrowRight,
  mdiChevronLeft,
  mdiChevronRight,
} from "@mdi/js";
import {
  type IconButtonProps,
  SvgIcon,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useIntl } from "react-intl";

import { ios } from "../../utils/platforms";
import TopIconButton from "../TopIconButton";

const BackButton = (props: IconButtonProps) => {
  const intl = useIntl();
  const { direction } = useTheme();

  const icon = ios ? (
    <SvgIcon
      sx={{
        transform: "scale(1.5)",
      }}
    >
      <path d={direction === "rtl" ? mdiChevronRight : mdiChevronLeft} />
    </SvgIcon>
  ) : (
    <SvgIcon>
      <path d={direction === "rtl" ? mdiArrowRight : mdiArrowLeft} />
    </SvgIcon>
  );

  return (
    <Tooltip
      title={intl.formatMessage({ defaultMessage: "Back", id: "cyR7Kh" })}
    >
      <TopIconButton data-screenshots="back" edge="start" {...props}>
        {icon}
      </TopIconButton>
    </Tooltip>
  );
};

export default BackButton;
