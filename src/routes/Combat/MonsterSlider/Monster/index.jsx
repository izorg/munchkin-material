import { css } from "@emotion/react";
import { Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { counterMessages } from "../../../../components/Counter";
import {
  decrementMonsterBonus,
  decrementMonsterLevel,
  incrementMonsterBonus,
  incrementMonsterLevel,
} from "../../../../ducks/monsters";
import Counter from "../../Counter";

const CombatMonster = ({ monsterId, title }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useTheme();

  const monsters = useSelector((state) => state.present.monsters);

  const { bonus, id, level } = monsters[monsterId];

  const omMonsterLevelDecrement = useCallback(
    () => dispatch(decrementMonsterLevel(id)),
    [dispatch, id]
  );

  const omMonsterLevelIncrement = useCallback(
    () => dispatch(incrementMonsterLevel(id)),
    [dispatch, id]
  );

  const onMonsterBonusDecrement = useCallback(
    () => dispatch(decrementMonsterBonus(id)),
    [dispatch, id]
  );

  const onMonsterBonusIncrement = useCallback(
    () => dispatch(incrementMonsterBonus(id)),
    [dispatch, id]
  );

  const itemCss = css`
    flex: 1;
    overflow: hidden;
  `;

  return (
    <div
      css={css`
        padding: ${theme.spacing(1)};
        text-align: center;
      `}
    >
      <Typography
        align="center"
        component="div"
        css={css`
          margin: 0 0 16px;
          padding: 0 24px;
        `}
        noWrap
      >
        {title}
      </Typography>

      <div
        css={css`
          display: flex;
          margin: 0 auto;
          max-width: 280px;
        `}
      >
        <Counter
          css={itemCss}
          onDecrement={omMonsterLevelDecrement}
          onIncrement={omMonsterLevelIncrement}
          title={intl.formatMessage(counterMessages.level)}
          value={level}
        />
        <Counter
          css={itemCss}
          onDecrement={onMonsterBonusDecrement}
          onIncrement={onMonsterBonusIncrement}
          title={intl.formatMessage(counterMessages.modifier)}
          value={bonus}
        />
      </div>
    </div>
  );
};

CombatMonster.propTypes = {
  monsterId: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
};

export default CombatMonster;
