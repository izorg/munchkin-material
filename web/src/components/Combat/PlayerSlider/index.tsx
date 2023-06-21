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
  const { helperId = null, playerId, sx = [], ...rest } = props;

  const dispatch = useAppDispatch();
  const theme = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const { direction } = theme;
  const directionMultiplier = direction === "rtl" ? -1 : 1;

  const landscape = useMediaQuery("(orientation: landscape)");

  const playerCount = helperId ? 2 : 1;
  const playerCountRef = useRef(playerCount);

  useEffect(() => {
    const child = containerRef.current;

    if (!child) {
      return;
    }

    if (landscape) {
      if (playerCount > playerCountRef.current) {
        child.scrollTo({
          top: child.scrollHeight,
        });
      }
    } else {
      if (playerCount > playerCountRef.current) {
        child.scrollTo({
          left: child.scrollWidth * directionMultiplier,
        });
      }
    }

    playerCountRef.current = playerCount;
  }, [directionMultiplier, landscape, playerCount]);

  const handleHelperRemove = () => {
    dispatch(setCombatHelper(null));
    dispatch(setCombatHelperBonus(0));
  };

  const itemContainerSx: SxProps<Theme> = {
    flexShrink: 0,
    padding: 1,
    scrollMargin: theme.spacing(3),
    scrollSnapAlign: "start",
  };

  const paperSx = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "auto",
    position: "relative",

    "@media (orientation: portrait)": {
      width: "280px",
    },

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

          "@media(orientation: portrait)": {
            width: "100%",
          },

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
        sx={{
          display: "flex",
          flexShrink: 0,
          maxHeight: "100%",
          maxWidth: "100%",
          overflow: "auto",
          padding: 1,
          scrollBehavior: "smooth",
          scrollSnapType: "both mandatory",

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

export default memo(CombatPlayerSlider);
