import {
  IconButton,
  makeStyles,
  Paper,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { CloseCircle } from "mdi-material-ui";
import PropTypes from "prop-types";
import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { setCombatHelper, setCombatHelperBonus } from "../../../ducks/combat";

import Player from "./Player";

const displayName = "CombatPlayerSlider";

const useStyles = makeStyles(
  /* eslint-disable sort-keys */
  (theme) => ({
    players: {
      display: "flex",
      overflow: "hidden",

      "@media (orientation: portrait)": {
        width: "100%",
      },

      "@media (orientation: landscape)": {
        flexDirection: "column",
        height: "100%",
      },
    },

    flex: {
      flex: 1,
    },

    container: {
      display: "flex",
      flexShrink: 0,
      padding: theme.spacing(1),

      "@media (orientation: landscape)": {
        flexDirection: "column",
      },
    },

    itemContainer: {
      flexShrink: 0,
      padding: theme.spacing(1),
    },

    paper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: "auto",
      position: "relative",

      "@media (orientation: portrait)": {
        width: 280,
      },

      "@media (orientation: landscape)": {
        maxWidth: 320,
      },
    },

    remove: {
      height: 36,
      padding: 6,
      position: "absolute",
      right: 0,
      top: 0,
      width: 36,
    },
  }),
  /* eslint-enable */
  { name: displayName }
);

const CombatPlayerSlider = ({ className, helperId, playerId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  /**
   * @type {React.MutableRefObject<HTMLDivElement>}
   */
  const ref = useRef();

  /**
   * @type {React.MutableRefObject<HTMLDivElement>}
   */
  const containerRef = useRef();

  const { direction } = useTheme();

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

  return (
    <div ref={ref} className={clsx(classes.players, className)}>
      <div className={classes.flex} />
      <motion.div
        ref={containerRef}
        animate={animate}
        className={classes.container}
        drag={landscape ? "y" : "x"}
        dragTransition={{
          modifyTarget,
          timeConstant: 300,
        }}
        onDrag={onDrag}
        style={{ x, y }}
      >
        <div className={classes.itemContainer}>
          <Paper className={classes.paper}>
            <Player playerId={playerId} />
          </Paper>
        </div>
        {helperId && (
          <div className={classes.itemContainer}>
            <Paper key={helperId} className={classes.paper}>
              <Player playerId={helperId} />

              <IconButton
                className={classes.remove}
                onClick={handleHelperRemove}
              >
                <CloseCircle />
              </IconButton>
            </Paper>
          </div>
        )}
      </motion.div>
      <div className={classes.flex} />
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
