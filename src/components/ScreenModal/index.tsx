import { css } from "@emotion/react";
import { Fade, Modal, Slide, useMediaQuery, useTheme } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import PropTypes from "prop-types";
import type { FC, PropsWithChildren } from "react";

import { ios } from "../../utils/platforms";

const displayName = "ScreenModal";

type ScreenModalProps = {
  open: boolean;
  TransitionProps?: TransitionProps;
};

const ScreenModal: FC<PropsWithChildren<ScreenModalProps>> = ({
  children,
  open,
  TransitionProps,
}) => {
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  TransitionProps: PropTypes.object,
};

ScreenModal.displayName = displayName;

export default ScreenModal;
