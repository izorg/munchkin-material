import { Box, useTheme } from "@mui/material";
import { m, type PanInfo, useAnimation } from "framer-motion";
import PropTypes from "prop-types";
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

import usePresentSelector from "../../../hooks/usePresentSelector";

import PlayerStats from "./Stats";

type PlayerSliderProps = {
  playerId: string;
};

const PlayerSlider = ({ playerId }: PlayerSliderProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { direction } = theme;

  const rtl = direction === "rtl";

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
    [playerCount]
  );

  const ref = useRef<HTMLDivElement>(null);

  const controls = useAnimation();

  const onDragEnd = async (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!ref.current) {
      return;
    }

    const offset = info.offset.x;
    const velocity = info.velocity.x;

    let direction = 0;

    if (Math.abs(velocity) >= 500) {
      direction = velocity > 0 ? 1 : -1;
    } else if (Math.abs(offset) >= ref.current.offsetWidth / 2) {
      direction = offset > 0 ? 1 : -1;
    }

    if (direction) {
      const playerDirection = rtl ? direction : -direction;

      const nextPlayerId =
        playerList[getPlayerIndex(currentIndex + playerDirection)];

      navigate(`/player/${nextPlayerId}`, {
        replace: true,
      });

      controls.set({
        x: ref.current.offsetWidth * -direction + offset,
      });

      await controls.start(
        {
          x: 0,
        },
        {
          mass: 0.1,
          type: "spring",
          velocity,
        }
      );
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        overflowX: "hidden",
        width: "100%",
      }}
    >
      <Box
        animate={controls}
        component={m.div}
        drag={playerList.length > 1 ? "x" : false}
        dragConstraints={ref}
        dragElastic={1}
        onDragEnd={onDragEnd}
        sx={{
          height: "100%",
          position: "relative",
        }}
      >
        {[currentIndex - 1, currentIndex, currentIndex + 1].map((index) => {
          const playerIndex = getPlayerIndex(index);
          const playerId = playerList[playerIndex];

          return (
            <Box
              key={`${playerId}-${index}`}
              sx={[
                {
                  alignItems: "center",
                  display: "flex",
                  height: "100%",
                  padding: theme.spacing(2, 2, 7),
                  width: "100%",

                  // eslint-disable-next-line sort-keys
                  "@media (min-height: 720px)": {
                    paddingBottom: 2,
                  },
                },
                index === currentIndex - 1 && {
                  left: "-100%",
                  position: "absolute",
                  top: 0,
                },
                index === currentIndex + 1 && {
                  left: "100%",
                  position: "absolute",
                  top: 0,
                },
              ]}
            >
              <PlayerStats
                playerId={playerId}
                sx={{
                  height: "100%",
                  margin: "0 auto",
                  maxHeight: "600px",
                  maxWidth: "600px",
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

PlayerSlider.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default PlayerSlider;
