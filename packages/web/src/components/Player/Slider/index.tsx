import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import {
  Box,
  IconButton,
  SvgIcon,
  type SxProps,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import usePresentSelector from "../../../hooks/usePresentSelector";

import { SliderItem } from "./SliderItem";

type PlayerSliderProps = {
  playerId: string;
  sx?: SxProps;
};

const PlayerSlider = ({ playerId, sx = [] }: PlayerSliderProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const theme = useTheme();

  const rtl = theme.direction === "rtl";

  const directionMultiplier = rtl ? -1 : 1;

  const playerList = usePresentSelector((state) => state.playerList);
  const playerCount = playerList.length;

  const currentIndex = playerList.indexOf(playerId);

  const getPlayerIndex = useCallback(
    (index: number) => {
      let playerIndex = index % playerCount;

      if (playerIndex < 0) {
        playerIndex = playerCount + playerIndex;
      }

      return playerIndex;
    },
    [playerCount],
  );

  const ref = useRef<HTMLDivElement>(null);

  const onWindowResize = useCallback(() => {
    const element = ref.current;

    if (element) {
      element.scrollLeft = element.offsetWidth * directionMultiplier;
    }
  }, [directionMultiplier]);

  useLayoutEffect(() => {
    const element = ref.current;

    if (
      playerCount > 1 &&
      element &&
      playerId // needed update scroll position after navigation
    ) {
      element.scrollLeft = element.offsetWidth * directionMultiplier;
    }

    window.addEventListener("resize", onWindowResize, false);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [directionMultiplier, onWindowResize, playerCount, playerId]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const onScroll = async () => {
      let direction = 0;

      // Safari in some cases returns -1 (+1 for rtl) instead of 0
      if (Math.abs(element.scrollLeft) <= 1) {
        direction = -1;
      } else if (Math.abs(element.scrollLeft) >= element.offsetWidth * 2) {
        direction = 1;
      }

      if (direction === 0) {
        return;
      }

      const nextPlayerId = playerList[getPlayerIndex(currentIndex + direction)];

      await navigate(`/player/${nextPlayerId}`, {
        replace: true,
      });
    };

    let timeout: number | undefined;

    const clearScrollTimeout = () => {
      if (timeout) {
        window.clearTimeout(timeout);

        timeout = undefined;
      }
    };

    const onDebouncedScroll = () => {
      clearScrollTimeout();
      timeout = window.setTimeout(onScroll, 100);
    };

    element.addEventListener("scroll", onDebouncedScroll, false);

    return () => {
      element.removeEventListener("scroll", onDebouncedScroll);
      clearScrollTimeout();
    };
  }, [currentIndex, getPlayerIndex, navigate, playerList]);

  const sliderItems = useMemo(() => {
    const indexes =
      playerCount > 1
        ? [currentIndex - 1, currentIndex, currentIndex + 1]
        : [currentIndex];

    return indexes.map<[index: number, playerId: string]>((index) => [
      index,
      playerList[getPlayerIndex(index)],
    ]);
  }, [currentIndex, getPlayerIndex, playerCount, playerList]);

  const onPrevious = () => {
    const element = ref.current;

    if (element) {
      element.scrollBy({
        behavior: "smooth",
        left: -element.offsetWidth * directionMultiplier,
      });
    }
  };

  const onNext = () => {
    const element = ref.current;

    if (element) {
      element.scrollBy({
        behavior: "smooth",
        left: element.offsetWidth * directionMultiplier,
      });
    }
  };

  return (
    <Box
      sx={[
        {
          position: "relative",
        },
        ...(sx instanceof Array ? sx : [sx]),
      ]}
    >
      <Box
        ref={ref}
        sx={[
          {
            display: "flex",
            overflowX: "hidden",
            scrollbarWidth: "none",
            width: "100%",
          },
          {
            "@supports (scroll-snap-type: x mandatory)": {
              overflowX: "auto",
              scrollSnapType: "x mandatory",
            },
          },
        ]}
      >
        {sliderItems.map(([index, playerId]) => (
          <SliderItem
            // @ts-expect-error https://github.com/facebook/react/issues/17157
            inert={currentIndex === index ? undefined : ""}
            key={`${playerId}-${index}`}
            playerId={playerId}
            sx={{
              flexShrink: "0",
              scrollSnapAlign: "center",
              scrollSnapStop: "always",
              width: "100%",
            }}
          />
        ))}
      </Box>
      {sliderItems.length > 1 && (
        <>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: "Previous player",
              id: "VWJ5/Y",
            })}
          >
            <IconButton
              onClick={onPrevious}
              size="large"
              sx={[
                (theme) => ({
                  left: {
                    sm: theme.spacing(2),
                    xs: theme.spacing(1),
                  },
                  position: "absolute",
                  top: `calc(50% - ${theme.spacing(4)})`,
                  transform: "translateY(-50%)",
                }),
                {
                  "@supports (scroll-snap-type: x mandatory)": {
                    display: {
                      sm: "inline-flex",
                      xs: "none",
                    },
                  },
                },
                (theme) => ({
                  "@supports (padding: max(0px))": {
                    '[dir="ltr"] &': {
                      left: {
                        sm: `max(${theme.spacing(
                          2,
                        )}, env(safe-area-inset-left)) /*! @noflip */`,
                        xs: `max(${theme.spacing(
                          1,
                        )}, env(safe-area-inset-left)) /*! @noflip */`,
                      },
                    },
                    '[dir="rtl"] &': {
                      right: {
                        sm: `max(${theme.spacing(
                          2,
                        )}, env(safe-area-inset-right)) /*! @noflip */`,
                        xs: `max(${theme.spacing(
                          1,
                        )}, env(safe-area-inset-right)) /*! @noflip */`,
                      },
                    },
                  },
                }),
              ]}
            >
              <SvgIcon>
                <path d={rtl ? mdiChevronRight : mdiChevronLeft} />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: "Next player",
              id: "U8jwxJ",
            })}
          >
            <IconButton
              onClick={onNext}
              size="large"
              sx={[
                (theme) => ({
                  position: "absolute",
                  right: {
                    sm: theme.spacing(2),
                    xs: theme.spacing(1),
                  },
                  top: `calc(50% - ${theme.spacing(4)})`,
                  transform: "translateY(-50%)",
                }),
                {
                  "@supports (scroll-snap-type: x mandatory)": {
                    display: {
                      sm: "inline-flex",
                      xs: "none",
                    },
                  },
                },
                (theme) => ({
                  "@supports (padding: max(0px))": {
                    '[dir="ltr"] &': {
                      right: {
                        sm: `max(${theme.spacing(
                          2,
                        )}, env(safe-area-inset-right)) /*! @noflip */`,
                        xs: `max(${theme.spacing(
                          1,
                        )}, env(safe-area-inset-right)) /*! @noflip */`,
                      },
                    },
                    '[dir="rtl"] &': {
                      left: {
                        sm: `max(${theme.spacing(
                          2,
                        )}, env(safe-area-inset-left)) /*! @noflip */`,
                        xs: `max(${theme.spacing(
                          1,
                        )}, env(safe-area-inset-left)) /*! @noflip */`,
                      },
                    },
                  },
                }),
              ]}
            >
              <SvgIcon>
                <path d={rtl ? mdiChevronLeft : mdiChevronRight} />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default PlayerSlider;
