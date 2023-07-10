import { Box, type SxProps, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";

import usePresentSelector from "../../../hooks/usePresentSelector";

import { SliderItem } from "./SliderItem";

type PlayerSliderProps = {
  playerId: string;
  sx?: SxProps;
};

const PlayerSlider = ({ playerId, sx = [] }: PlayerSliderProps) => {
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

  const onScrollEnd = useCallback(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    let direction = 0;

    if (element.scrollLeft === 0) {
      direction = -1;
    } else if (
      element.scrollLeft >=
      element.offsetWidth * 2 * directionMultiplier
    ) {
      direction = 1;
    }

    if (direction === 0) {
      return;
    }

    const playerDirection = direction;

    const nextPlayerId =
      playerList[getPlayerIndex(currentIndex + playerDirection)];

    navigate(`/player/${nextPlayerId}`, {
      replace: true,
    });
  }, [currentIndex, directionMultiplier, getPlayerIndex, navigate, playerList]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    element.addEventListener("scrollend", onScrollEnd, false);

    return () => {
      element.removeEventListener("scrollend", onScrollEnd);
    };
  }, [onScrollEnd]);

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

  return (
    <Box
      ref={ref}
      sx={[
        {
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
        },
        {
          "@supports (-ms-scroll-snap-type: mandatory)": {
            MsScrollSnapType: "mandatory",
          },
        },
        ...(sx instanceof Array ? sx : [sx]),
      ]}
    >
      {sliderItems.map(([index, playerId]) => (
        <SliderItem
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
  );
};

PlayerSlider.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default PlayerSlider;
