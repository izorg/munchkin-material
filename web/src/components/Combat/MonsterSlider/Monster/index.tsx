import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { type ReactNode, useCallback } from "react";
import { useIntl } from "react-intl";

import {
  decrementMonsterBonus,
  decrementMonsterLevel,
  incrementMonsterBonus,
  incrementMonsterLevel,
} from "../../../../ducks/monsters";
import usePresentSelector from "../../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../../store";
import { counterMessages } from "../../../Counter";
import Counter from "../../Counter";

type CombatMonsterProps = {
  monsterId: string;
  title: ReactNode;
};

const CombatMonster = (props: CombatMonsterProps) => {
  const { monsterId, title } = props;

  const dispatch = useAppDispatch();
  const intl = useIntl();

  const monsters = usePresentSelector((state) => state.monsters);

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

  const itemSx = {
    flex: 1,
    overflow: "hidden",
  };

  return (
    <Box
      sx={{
        padding: 1,
        textAlign: "center",
      }}
    >
      <Typography
        align="center"
        component="div"
        noWrap
        sx={{
          margin: "0 0 16px",
          padding: "0 24px",
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          margin: "0 auto",
          maxWidth: "280px",
        }}
      >
        <Counter
          onDecrement={omMonsterLevelDecrement}
          onIncrement={omMonsterLevelIncrement}
          sx={itemSx}
          title={intl.formatMessage(counterMessages.level)}
          value={level}
        />
        <Counter
          onDecrement={onMonsterBonusDecrement}
          onIncrement={onMonsterBonusIncrement}
          sx={itemSx}
          title={intl.formatMessage(counterMessages.modifier)}
          value={bonus}
        />
      </Box>
    </Box>
  );
};

CombatMonster.propTypes = {
  monsterId: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
};

export default CombatMonster;
