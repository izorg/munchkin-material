import {
  Box,
  Fade,
  Modal,
  Slide,
  type Theme,
  useMediaQuery,
} from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import PropTypes from "prop-types";
import { type ReactNode, type VFC } from "react";

import { ios } from "../../utils/platforms";

type ScreenModalProps = {
  children: ReactNode;
  open: boolean;
  TransitionProps?: TransitionProps;
};

const ScreenModal: VFC<ScreenModalProps> = ({
  children,
  open,
  TransitionProps,
}) => {
  const slide =
    useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg")) && ios;
  const TransitionComponent = slide ? Slide : Fade;

  return (
    <Modal closeAfterTransition hideBackdrop open={open}>
      <TransitionComponent
        appear
        direction={slide ? "left" : undefined}
        in={open}
        {...TransitionProps}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            outline: "none",
          }}
        >
          {children}
        </Box>
      </TransitionComponent>
    </Modal>
  );
};

ScreenModal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  TransitionProps: PropTypes.object,
};

export default ScreenModal;
