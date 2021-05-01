import { css } from "@emotion/react";
import { IconButton, Paper, useMediaQuery, useTheme } from "@material-ui/core";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { CloseCircle } from "mdi-material-ui";
import PropTypes from "prop-types";
import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { setCombatHelper, setCombatHelperBonus } from "../../../ducks/combat";

import Player from "./Player";

const displayName = "CombatPlayerSlider";

const CombatPlayerSlider = ({ className, helperId, playerId }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  /**
   * @type {React.MutableRefObject<HTMLDivElement>}
   */
  const ref = useRef();

  /**
   * @type {React.MutableRefObject<HTMLDivElement>}
   */
  const containerRef = useRef();

  const { direction } = theme;

  const landscape = useMediaQuery("(orientation: landscape)");

  const animate = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onDrag = () => {
    const parent = ref.current;
    const child = containerRef.current;

    if (landscape) {
      if (child.offsetHeight <= parent.offsetHeight) {
        y.set(0);
      }
    } else {
      if (child.offsetWidth <= parent.offsetWidth) {
        x.set(0);
      }
    }
  };

  const modifyTarget = (target) => {
    const parent = ref.current;
    const child = containerRef.current;

    if (landscape) {
      if (child.offsetHeight <= parent.offsetHeight) {
        return 0;
      }

      const min = parent.offsetHeight - child.offsetHeight;
      const max = 0;

      if (target < min) {
        return min;
      }

      if (target > max) {
        return max;
      }
    } else {
      if (child.offsetWidth <= parent.offsetWidth) {
        return 0;
      }

      const min =
        direction === "rtl" ? 0 : parent.offsetWidth - child.offsetWidth;
      const max =
        direction === "rtl" ? child.offsetWidth - parent.offsetWidth : 0;

      if (target < min) {
        return min;
      }

      if (target > max) {
        return max;
      }
    }

    return target;
  };

  const playerCount = helperId ? 2 : 1;
  const playerCountRef = useRef(playerCount);

  useEffect(() => {
    const parent = ref.current;
    const child = containerRef.current;
    const transitionOverride = { type: "tween" };

    if (landscape) {
      if (playerCount > playerCountRef.current) {
        if (child.offsetHeight > parent.offsetHeight) {
          animate.start(
            { y: parent.offsetHeight - child.offsetHeight },
            transitionOverride
          );
        }
      }

      if (playerCount < playerCountRef.current) {
        if (child.offsetHeight <= parent.offsetHeight) {
          y.set(0);
        } else if (y.get() < parent.offsetHeight - child.offsetHeight) {
          animate.start(
            { y: parent.offsetHeight - child.offsetHeight },
            transitionOverride
          );
        }
      }
    } else {
      if (playerCount > playerCountRef.current) {
        if (child.offsetWidth > parent.offsetWidth) {
          let shift = parent.offsetWidth - child.offsetWidth;

          if (direction === "rtl") {
            shift = -shift;
          }

          animate.start({ x: shift }, transitionOverride);
        }
      }

      if (playerCount < playerCountRef.current) {
        if (child.offsetWidth <= parent.offsetWidth) {
          x.set(0);
        } else {
          if (direction === "rtl") {
            if (x.get() > child.offsetWidth - parent.offsetWidth) {
              animate.start(
                { x: child.offsetWidth - parent.offsetWidth },
                transitionOverride
              );
            }
          } else {
            if (x.get() < parent.offsetWidth - child.offsetWidth) {
              animate.start(
                { x: parent.offsetWidth - child.offsetWidth },
                transitionOverride
              );
            }
          }
        }
      }
    }

    if (playerCount === playerCountRef.current) {
      x.set(0);
      y.set(0);
    }

    playerCountRef.current = playerCount;
  }, [animate, direction, landscape, playerCount, x, y]);

  const handleHelperRemove = () => {
    dispatch(setCombatHelper(null));
    dispatch(setCombatHelperBonus(0));
  };

  const itemContainerCss = css`
    flex-shrink: 0;
    padding: ${theme.spacing(1)};
  `;

  const paperCss = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    position: relative;

    @media (orientation: portrait) {
      width: 280px;
    }

    @media (orientation: landscape) {
      max-width: 320px;
    }
  `;

  return (
    <div
      ref={ref}
      className={className}
      css={css`
        display: flex;
        overflow: hidden;

        @media (orientation: portrait) {
          width: 100%;
        }

        @media (orientation: landscape) {
          flex-direction: column;
          height: 100%;
        }
      `}
    >
      <div
        css={css`
          flex: 1;
        `}
      />
      <motion.div
        ref={containerRef}
        animate={animate}
        css={css`
          display: flex;
          flex-shrink: 0;
          padding: ${theme.spacing(1)};

          @media (orientation: landscape) {
            flex-direction: column;
          }
        `}
        drag={landscape ? "y" : "x"}
        dragTransition={{
          modifyTarget,
          timeConstant: 300,
        }}
        onDrag={onDrag}
        style={{ x, y }}
      >
        <div css={itemContainerCss}>
          <Paper css={paperCss}>
            <Player playerId={playerId} />
          </Paper>
        </div>
        {helperId && (
          <div css={itemContainerCss}>
            <Paper key={helperId} css={paperCss}>
              <Player playerId={helperId} />

              <IconButton
                css={css`
                  height: 36px;
                  padding: 6px;
                  position: absolute;
                  right: 0;
                  top: 0;
                  width: 36px;
                `}
                onClick={handleHelperRemove}
              >
                <CloseCircle />
              </IconButton>
            </Paper>
          </div>
        )}
      </motion.div>
      <div
        css={css`
          flex: 1;
        `}
      />
    </div>
  );
};

CombatPlayerSlider.propTypes = {
  className: PropTypes.string,
  helperId: PropTypes.string,
  playerId: PropTypes.string.isRequired,
};

CombatPlayerSlider.defaultProps = {
  helperId: null,
};

CombatPlayerSlider.displayName = displayName;

export default memo(CombatPlayerSlider);
