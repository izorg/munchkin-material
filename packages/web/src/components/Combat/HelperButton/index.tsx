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
import { useSearchParams } from "react-router-dom";

import { addMonster } from "../../../ducks/monsters";
import usePresentSelector from "../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../store";
import createMonster from "../../../utils/createMonster";
import { useGoBack } from "../../../utils/location";

const CombatHelperButton = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const goBack = useGoBack();
  const helperId = usePresentSelector((state) => state.combat.helperId);
  const hasOtherPlayers = usePresentSelector(
    (state) => state.playerList.length > 1,
  );
  const helper = !helperId && hasOtherPlayers;
  const open = searchParams.get("add") === "";

  const onAdd = () => {
    setSearchParams((searchParams) => {
      searchParams.set("add", "");

      return searchParams;
    });
  };
  const onBack = () => goBack();

  const onHelperClick = (event: MouseEvent) => {
    event.stopPropagation();

    setSearchParams(
      (searchParams) => {
        searchParams.set("add", "helper");

        return searchParams;
      },
      {
        replace: true,
      },
    );
  };
  const onMonsterAdd = () => dispatch(addMonster(createMonster()));

  return (
    <>
      <Backdrop
        onClick={onBack}
        open={open}
        sx={{
          zIndex: 1,
        }}
      />

      <SpeedDial
        ariaLabel=" "
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
        sx={[
          (theme) => ({
            bottom: {
              sm: theme.spacing(3),
              xs: theme.spacing(2),
            },
            position: "fixed",
            right: {
              sm: theme.spacing(3),
              xs: theme.spacing(2),
            },
            zIndex: 2,
          }),
          (theme) => ({
            "@supports (padding: max(0px))": {
              right: {
                sm: `max(${theme.spacing(3)}, env(safe-area-inset-right))`,
                xs: `max(${theme.spacing(2)}, env(safe-area-inset-right))`,
              },
            },
          }),
        ]}
        TransitionProps={{
          appear: false,
        }}
      >
        <SpeedDialAction
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
            // eslint-disable-next-line formatjs/enforce-id
            <FormattedMessage
              defaultMessage="Monster"
              id="combat.add.monster"
            />
          }
        />
        <SpeedDialAction
          icon={
            <SvgIcon>
              <path d={mdiAccountPlusOutline} />
            </SvgIcon>
          }
          onClick={onHelperClick}
          tooltipTitle={
            // eslint-disable-next-line formatjs/enforce-id
            <FormattedMessage defaultMessage="Helper" id="combat.add.helper" />
          }
        />
      </SpeedDial>
    </>
  );
};

export default memo(CombatHelperButton);
