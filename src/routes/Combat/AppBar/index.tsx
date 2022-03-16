import { mdiFlagCheckered } from "@mdi/js";
import { SvgIcon } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";

import BackButton from "../../../components/BackButton";
import DiceIconButton from "../../../components/dice/Button";
import Title from "../../../components/Title";
import TopAppBar from "../../../components/TopAppBar";
import TopIconButton from "../../../components/TopIconButton";
import { finishCombat } from "../../../ducks/combat";
import { useGoBack } from "../../../utils/location";

const CombatAppBar = () => {
  const dispatch = useDispatch();

  const goBack = useGoBack();
  const onBack = () => goBack();

  const onFinish = () => {
    dispatch(finishCombat());
    goBack();
  };

  return (
    <TopAppBar>
      <BackButton data-screenshots="combat-back-button" onClick={onBack} />

      <Title>
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
