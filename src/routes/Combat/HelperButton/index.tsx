import { css } from "@emotion/react";
import {
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  SvgIcon,
  useTheme,
} from "@material-ui/core";
import { mdiAccountPlus, mdiEmoticonDevilOutline } from "@mdi/js";
import { memo, MouseEvent } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { addMonster } from "../../../ducks/monsters";
import createMonster from "../../../utils/createMonster";
import { useGoBack, useLocationQuery } from "../../../utils/location";
import usePresentSelector from "../../../utils/usePresentSelector";

const CombatHelperButton = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const goBack = useGoBack();
  const helperId = usePresentSelector((state) => state.combat.helperId);
  const hasOtherPlayers = usePresentSelector(
    (state) => state.playerList.length > 1
  );
  const helper = !helperId && hasOtherPlayers;
  const query = useLocationQuery();
  const open = query.add === null;

  const onAdd = () =>
    navigate({
      ...location,
      search: `?add`,
    });
  const onBack = () => goBack();
  const onHelperClick = (event: MouseEvent) => {
    event.stopPropagation();
    navigate(
      {
        ...location,
        search: `?add=helper`,
      },
      { replace: true }
    );
  };
  const onMonsterAdd = () => dispatch(addMonster(createMonster()));

  return (
    <>
      <Backdrop
        css={css`
          background-color: ${theme.palette.mode === "light"
            ? "rgba(250, 250, 250, .9)"
            : undefined};
          z-index: 1;
        `}
        onClick={onBack}
        open={open}
      />

      <SpeedDial
        ariaLabel=" "
        css={css`
          bottom: ${theme.spacing(2)};
          position: fixed;
          right: ${theme.spacing(2)};
          z-index: 2;

          ${theme.breakpoints.up("sm")} {
            bottom: ${theme.spacing(3)};
            right: ${theme.spacing(3)};

            @supports (padding: max(0px)) {
              right: max(${theme.spacing(3)}, env(safe-area-inset-right));
            }
          }
        `}
        FabProps={{
          color: open ? "default" : "primary",
        }}
        icon={
          helper ? (
            <SpeedDialIcon />
          ) : (
            <SvgIcon>
              <path d={mdiEmoticonDevilOutline} />
            </SvgIcon>
          )
        }
        onClick={() => {
          if (open) {
            onBack();
          } else if (helper) {
            onAdd();
          } else {
            onMonsterAdd();
          }
        }}
        open={open}
        TransitionProps={{
          appear: false,
        }}
      >
        <SpeedDialAction
          FabProps={{
            color: "primary",
          }}
          icon={
            <SvgIcon>
              <path d={mdiEmoticonDevilOutline} />
            </SvgIcon>
          }
          onClick={(event) => {
            event.stopPropagation();
            onMonsterAdd();
            onBack();
          }}
          tooltipTitle={
            <FormattedMessage
              defaultMessage="Monster"
              id="combat.add.monster"
            />
          }
        />
        <SpeedDialAction
          FabProps={{
            color: "primary",
          }}
          icon={
            <SvgIcon>
              <path d={mdiAccountPlus} />
            </SvgIcon>
          }
          onClick={onHelperClick}
          tooltipTitle={
            <FormattedMessage defaultMessage="Helper" id="combat.add.helper" />
          }
        />
      </SpeedDial>
    </>
  );
};

export default memo(CombatHelperButton);
