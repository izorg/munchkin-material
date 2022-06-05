import { css } from "@emotion/react";
import { mdiCloseCircle } from "@mdi/js";
import {
  Box,
  IconButton,
  Paper,
  styled,
  SvgIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { m, useAnimation, useMotionValue } from "framer-motion";
import PropTypes from "prop-types";
import { memo, useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";

import { removeMonster } from "../../../ducks/monsters";
import { useAppDispatch } from "../../../store";
import usePresentSelector from "../../../utils/usePresentSelector";

import Monster from "./Monster";

const Filler = styled("div", { label: "Filler" })({
  flex: 1,
});

const CombatMonsterSlider = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const { direction } = theme;

  const landscape = useMediaQuery("(orientation: landscape)");

  const monsters = usePresentSelector((state) => state.combat.monsters);
  const monsterCount = useRef(monsters.length);

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

  useEffect(() => {
    const parent = ref.current;
    const child = containerRef.current;
    const transitionOverride = { type: "tween" };

    if (!child || !parent) {
      return;
    }

    if (landscape) {
      if (monsters.length > monsterCount.current) {
        if (child.offsetHeight > parent.offsetHeight) {
          void animate.start(
            { y: parent.offsetHeight - child.offsetHeight },
            transitionOverride
          );
        }
      }

      if (monsters.length < monsterCount.current) {
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
      if (monsters.length > monsterCount.current) {
        if (child.offsetWidth > parent.offsetWidth) {
          let shift = parent.offsetWidth - child.offsetWidth;

          if (direction === "rtl") {
            shift = -shift;
          }

          void animate.start({ x: shift }, transitionOverride);
        }
      }

      if (monsters.length < monsterCount.current) {
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

    if (monsters.length === monsterCount.current) {
      animate.stop();
      x.set(0);
      y.set(0);
    }

    monsterCount.current = monsters.length;
  }, [animate, direction, landscape, monsters.length, x, y]);

  const handleRemove = (monsterId: string) => {
    dispatch(removeMonster(monsterId));
  };

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
      <Filler />
      <m.div
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
        {monsters.map((id, monsterIndex) => (
          <Box
            key={id}
            sx={{
              flexShrink: 0,
              padding: 1,
            }}
          >
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",

                // eslint-disable-next-line sort-keys
                "@media (orientation: portrait)": {
                  width: "280px",
                },

                // eslint-disable-next-line sort-keys
                "@media (orientation: landscape)": {
                  maxWidth: "280px",
                },
              }}
            >
              <Monster
                monsterId={id}
                title={
                  <FormattedMessage
                    defaultMessage="Monster {number}"
                    id="combat.monster"
                    values={{
                      number: monsterIndex + 1,
                    }}
                  />
                }
              />

              {monsters.length > 1 && (
                <IconButton
                  onClick={() => handleRemove(id)}
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
              )}
            </Paper>
          </Box>
        ))}
      </m.div>
      <Filler />
    </div>
  );
};

CombatMonsterSlider.propTypes = {
  className: PropTypes.string,
};

export default memo(CombatMonsterSlider);
