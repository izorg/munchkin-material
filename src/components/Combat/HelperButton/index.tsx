import { mdiAccountPlusOutline, mdiEmoticonDevilOutline } from "@mdi/js";
import {
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  SvgIcon,
} from "@mui/material";
import { memo, type MouseEvent } from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

import { addMonster } from "../../../ducks/monsters";
import { useAppDispatch } from "../../../store";
import createMonster from "../../../utils/createMonster";
import { useGoBack } from "../../../utils/location";
import usePresentSelector from "../../../utils/usePresentSelector";

const CombatHelperButton = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = useGoBack();
  const helperId = usePresentSelector((state) => state.combat.helperId);
  const hasOtherPlayers = usePresentSelector(
    (state) => state.playerList.length > 1
  );
  const helper = !helperId && hasOtherPlayers;
  const open = new URLSearchParams(location.search).get("add") !== null;

  const onAdd = () => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set("add", "");

    navigate({
      search: `?${searchParams.toString()}`,
    });
  };
  const onBack = () => goBack();
  const onHelperClick = (event: MouseEvent) => {
    event.stopPropagation();

    const searchParams = new URLSearchParams(location.search);

    searchParams.set("add", "helper");

    navigate(
      {
        search: `?${searchParams.toString()}`,
      },
      { replace: true }
    );
  };
  const onMonsterAdd = () => dispatch(addMonster(createMonster()));

  return (
    <>
      <Backdrop
        onClick={onBack}
        open={open}
        sx={(theme) => ({
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(250, 250, 250, .9)"
              : undefined,
          zIndex: 1,
        })}
      />

      <SpeedDial
        ariaLabel=" "
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
        sx={(theme) => ({
          bottom: theme.spacing(2),
          position: "fixed",
          right: theme.spacing(2),
          zIndex: 2,

          [theme.breakpoints.up("sm")]: {
            bottom: theme.spacing(3),
            right: theme.spacing(3),

            // eslint-disable-next-line sort-keys
            "@supports (padding: max(0px))": {
              right: `max(${theme.spacing(3)}, env(safe-area-inset-right))`,
            },
          },
        })}
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
              <path d={mdiAccountPlusOutline} />
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
