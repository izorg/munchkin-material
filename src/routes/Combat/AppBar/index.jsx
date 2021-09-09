import { SvgIcon } from "@material-ui/core";
import { mdiFlagCheckered } from "@mdi/js";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";

import BackButton from "../../../components/BackButton";
import DiceIconButton from "../../../components/dice/Button";
import Title from "../../../components/Title";
import TopAppBar from "../../../components/TopAppBar";
import TopIconButton from "../../../components/TopIconButton";
import { finishCombat } from "../../../ducks/combat";
import { useGoBack } from "../../../utils/location";

const displayName = "CombatAppBar";

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

      <DiceIconButton edge="end" />

      <TopIconButton edge="end" onClick={onFinish}>
        <SvgIcon>
          <path d={mdiFlagCheckered} />
        </SvgIcon>
      </TopIconButton>
    </TopAppBar>
  );
};

CombatAppBar.displayName = displayName;

export default CombatAppBar;
