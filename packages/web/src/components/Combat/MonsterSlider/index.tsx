import { mdiCloseCircle } from "@mdi/js";
import {
  Box,
  type BoxProps,
  IconButton,
  Paper,
  styled,
  SvgIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { type FC, memo, useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";

import { removeMonster } from "../../../ducks/monsters";
import usePresentSelector from "../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../store";

import Monster from "./Monster";

const Filler = styled("div", { label: "Filler" })({
  flex: 1,
});

const CombatMonsterSlider: FC<BoxProps> = ({ sx = [], ...props }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const { direction } = theme;
  const directionMultiplier = direction === "rtl" ? -1 : 1;

  const landscape = useMediaQuery("(orientation: landscape)");

  const monsters = usePresentSelector((state) => state.combat.monsters);
  const monsterCount = useRef(monsters.length);

  useEffect(() => {
    const child = containerRef.current;

    if (!child) {
      return;
    }

    if (monsters.length > monsterCount.current) {
      if (landscape) {
        child.scrollTo({
          top: child.scrollHeight,
        });
      } else {
        child.scrollTo({
          left: child.scrollWidth * directionMultiplier,
        });
      }
    }

    monsterCount.current = monsters.length;
  }, [directionMultiplier, landscape, monsters.length]);

  const handleRemove = (monsterId: string) => {
    dispatch(removeMonster(monsterId));
  };

  return (
    <Box
      ref={ref}
      sx={[
        {
          display: "flex",
          overflow: "hidden",
        },
        {
          "@media (orientation: landscape)": {
            flexDirection: "column",
            height: "100%",
          },
          "@media (orientation: portrait)": {
            width: "100%",
          },
        },
        ...(sx instanceof Array ? sx : [sx]),
      ]}
      {...props}
    >
      <Filler />
      <Box
        ref={containerRef}
        sx={[
          {
            display: "flex",
            flexShrink: 0,
            maxHeight: "100%",
            maxWidth: "100%",
            overflow: "auto",
            padding: 1,
            scrollBehavior: "smooth",
            scrollSnapType: "both mandatory",
          },
          {
            "@media (orientation: landscape)": {
              flexDirection: "column",
            },
          },
        ]}
      >
        {monsters.map((id, monsterIndex) => (
          <Box
            key={id}
            sx={(theme) => ({
              flexShrink: 0,
              padding: 1,
              scrollMargin: theme.spacing(3),
              scrollSnapAlign: "start",
            })}
          >
            <Paper
              sx={[
                {
                  display: "flex",
                  flexDirection: "column",
                  height: "160px",
                  justifyContent: "center",
                  position: "relative",
                },
                {
                  "@media (orientation: landscape)": {
                    maxWidth: "280px",
                  },
                  "@media (orientation: portrait)": {
                    width: "280px",
                  },
                },
              ]}
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
      </Box>
      <Filler />
    </Box>
  );
};

export default memo(CombatMonsterSlider);
