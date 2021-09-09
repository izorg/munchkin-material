import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { lazy, Suspense, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate, useMatch } from "react-router-dom";

import PlayerContext from "../../components/PlayerContext";
import ScreenModal from "../../components/ScreenModal";

import AppBar from "./AppBar";
import CombatButton from "./CombatButton";
import PlayerList from "./List";
import Slider from "./Slider";

const Combat = lazy(() =>
  import(
    /* webpackPrefetch: true */
    "../Combat"
  )
);

const Player = ({ playerId }) => {
  const theme = useTheme();

  const playerRef = useRef();
  const playerList = useSelector((state) => state.present.playerList);

  const combatMatch = useMatch({
    end: false,
    path: "/player/:id/combat",
  });

  if (playerId && !playerList.includes(playerId)) {
    return <Navigate to="/" />;
  }

  if (playerId) {
    playerRef.current = playerId;
  }

  if (!playerRef.current) {
    return <Navigate to="/" />;
  }

  return (
    <PlayerContext.Provider value={playerRef.current}>
      <div
        css={css`
          background-color: ${theme.palette.background.default};
          display: flex;
          flex: 1;
          flex-direction: column;
          overflow: hidden;
        `}
      >
        <AppBar playerId={playerRef.current} />
        <div
          css={css`
            display: flex;
            flex: 1;
            flex-direction: column;
            overflow-y: auto;

            ${theme.breakpoints.up("md")} {
              flex-direction: row-reverse;
            }
          `}
        >
          <div
            css={css`
              display: flex;
              flex: 1 0 auto;

              ${theme.breakpoints.up("md")} {
                flex-shrink: 1;
                overflow: hidden;
              }
            `}
          >
            <Slider playerId={playerRef.current} />
          </div>
          {playerList.length > 1 && (
            <PlayerList
              css={css`
                display: none;
                flex: 0 1 auto;
                overflow-y: auto;
                padding-bottom: ${theme.spacing(7)};

                @media (min-height: 720px) {
                  display: block;
                }

                ${theme.breakpoints.up("sm")} {
                  padding-bottom: ${theme.spacing(8)};
                }

                ${theme.breakpoints.up("md")} {
                  display: block;
                  flex: none;
                  padding-bottom: ${theme.spacing(1)};
                  width: ${theme.spacing(50)};
                }
              `}
              selectedPlayerId={playerRef.current}
            />
          )}
        </div>
      </div>
      <CombatButton playerId={playerRef.current} />

      <ScreenModal open={Boolean(combatMatch)}>
        <Suspense fallback={null}>
          <Combat />
        </Suspense>
      </ScreenModal>
    </PlayerContext.Provider>
  );
};

Player.propTypes = {
  playerId: PropTypes.string,
};

Player.defaultProps = {
  playerId: null,
};

export default Player;
