import { mdiCloseCircle } from "@mdi/js";
import {
  Box,
  type BoxProps,
  IconButton,
  Paper,
  styled,
  SvgIcon,
  type SxProps,
  type Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  m,
  type Transition,
  useAnimation,
  useMotionValue,
} from "framer-motion";
import PropTypes from "prop-types";
import { type FC, memo, useEffect, useRef } from "react";

import { setCombatHelper, setCombatHelperBonus } from "../../../ducks/combat";
import { useAppDispatch } from "../../../store";

import Player from "./Player";

const Filler = styled("div", { label: "Filler" })({
  flex: 1,
});

type CombatPlayerSliderProps = BoxProps & {
  helperId?: null | string;
  playerId: string;
};

const CombatPlayerSlider: FC<CombatPlayerSliderProps> = (props) => {
  const { helperId, playerId, sx = [], ...rest } = props;

  const dispatch = useAppDispatch();
  const theme = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const { direction } = theme;

  const landscape = useMediaQuery("(orientation: landscape)");

  const animate = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onDrag = () => {
    const parent = ref.current;
    const child = containerRef.current;

    if (!child || !parent) {
      return;
    }

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

  const modifyTarget = (target: number) => {
    const parent = ref.current;
    const child = containerRef.current;

    if (!child || !parent) {
      return 0;
    }

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
    const transitionOverride = { type: "tween" } satisfies Transition;

    if (!child || !parent) {
      return;
    }

    if (landscape) {
      if (playerCount > playerCountRef.current) {
        if (child.offsetHeight > parent.offsetHeight) {
          void animate.start(
            { y: parent.offsetHeight - child.offsetHeight },
            transitionOverride
          );
        }
      }

      if (playerCount < playerCountRef.current) {
        if (child.offsetHeight <= parent.offsetHeight) {
          y.set(0);
        } else if (y.get() < parent.offsetHeight - child.offsetHeight) {
          void animate.start(
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

          void animate.start({ x: shift }, transitionOverride);
        }
      }

      if (playerCount < playerCountRef.current) {
        if (child.offsetWidth <= parent.offsetWidth) {
          x.set(0);
        } else {
          if (direction === "rtl") {
            if (x.get() > child.offsetWidth - parent.offsetWidth) {
              void animate.start(
                { x: child.offsetWidth - parent.offsetWidth },
                transitionOverride
              );
            }
          } else {
            if (x.get() < parent.offsetWidth - child.offsetWidth) {
              void animate.start(
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

  const itemContainerSx: SxProps<Theme> = {
    flexShrink: 0,
    padding: 1,
  };

  const paperSx = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "auto",
    position: "relative",

    // eslint-disable-next-line sort-keys
    "@media (orientation: portrait)": {
      width: "280px",
    },

    // eslint-disable-next-line sort-keys
    "@media (orientation: landscape)": {
      maxWidth: "320px",
    },
  };

  return (
    <Box
      {...rest}
      ref={ref}
      sx={[
        {
          display: "flex",
          overflow: "hidden",

          // eslint-disable-next-line sort-keys
          "@media(orientation: portrait)": {
            width: "100%",
          },

          // eslint-disable-next-line sort-keys
          "@media (orientation: landscape)": {
            flexDirection: "column",
            height: "100%",
          },
        },
        ...(sx instanceof Array ? sx : [sx]),
      ]}
    >
      <Filler />
      <Box
        ref={containerRef}
        animate={animate}
        component={m.div}
        drag={landscape ? "y" : "x"}
        dragTransition={{
          modifyTarget,
          timeConstant: 300,
        }}
        onDrag={onDrag}
        style={{ x, y }}
        sx={{
          display: "flex",
          flexShrink: 0,
          padding: 1,

          // eslint-disable-next-line sort-keys
          "@media (orientation: landscape)": {
            flexDirection: "column",
          },
        }}
      >
        <Box sx={itemContainerSx}>
          <Paper sx={paperSx}>
            <Player playerId={playerId} />
          </Paper>
        </Box>
        {helperId && (
          <Box sx={itemContainerSx}>
            <Paper key={helperId} sx={paperSx}>
              <Player playerId={helperId} />

              <IconButton
                onClick={handleHelperRemove}
                sx={{
                  height: "36px",
                  padding: "6px",
                  position: "absolute",
                  right: 0,
                  top: 0,
                  width: "36px",
                }}
              >
                <SvgIcon>
                  <path d={mdiCloseCircle} />
                </SvgIcon>
              </IconButton>
            </Paper>
          </Box>
        )}
      </Box>
      <Filler />
    </Box>
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

export default memo(CombatPlayerSlider);
