import { css } from "@emotion/react";
import { Fade, Modal, Slide, useMediaQuery, useTheme } from "@material-ui/core";
import PropTypes from "prop-types";

import { ios } from "../../utils/platforms";

const displayName = "ScreenModal";

const ScreenModal = ({ children, open, TransitionProps }) => {
  const theme = useTheme();

  const slide = useMediaQuery(theme.breakpoints.down("lg")) && ios;
  const TransitionComponent = slide ? Slide : Fade;

  return (
    <Modal closeAfterTransition hideBackdrop open={open}>
      <TransitionComponent
        appear
        direction={slide ? "left" : undefined}
        in={open}
        {...TransitionProps}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            height: 100%;
            outline: none;
          `}
        >
          {children}
        </div>
      </TransitionComponent>
    </Modal>
  );
};

ScreenModal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  TransitionProps: PropTypes.object,
};

ScreenModal.displayName = displayName;

export default ScreenModal;
