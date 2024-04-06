import { mdiFlagCheckered } from "@mdi/js";
import { SvgIcon } from "@mui/material";
import { useCallback } from "react";
import { FormattedMessage } from "react-intl";

import { finishCombat } from "../../../ducks/combat/actions";
import { useAppDispatch } from "../../../store";
import { useGoBack } from "../../../utils/location";
import BackButton from "../../BackButton";
import DiceIconButton from "../../DiceButton";
import Title from "../../Title";
import TopAppBar from "../../TopAppBar";
import TopIconButton from "../../TopIconButton";

const CombatAppBar = () => {
  const dispatch = useAppDispatch();

  const goBack = useGoBack();

  const onFinish = useCallback(() => {
    dispatch(finishCombat());
    goBack();
  }, [dispatch, goBack]);

  return (
    <TopAppBar>
      <BackButton data-screenshots="combat-back-button" onClick={goBack} />

      <Title>
        {/* eslint-disable-next-line formatjs/enforce-id */}
        <FormattedMessage defaultMessage="Combat" id="combat" />
      </Title>

      <DiceIconButton />

      <TopIconButton edge="end" onClick={onFinish}>
        <SvgIcon>
          <path d={mdiFlagCheckered} />
        </SvgIcon>
      </TopIconButton>
    </TopAppBar>
  );
};

export default CombatAppBar;
