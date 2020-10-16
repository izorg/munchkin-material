import { Backdrop, makeStyles } from '@material-ui/core';
import SpeedDial from '@material-ui/core/SpeedDial';
import SpeedDialAction from '@material-ui/core/SpeedDialAction';
import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
import clsx from 'clsx';
import { AccountPlus, EmoticonDevilOutline } from 'mdi-material-ui';
import { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { addMonster } from '../../../ducks/monsters';
import createMonster from '../../../utils/createMonster';
import { useGoBack, useLocationQuery } from '../../../utils/location';

const displayName = 'CombatHelperButton';

const useStyles = makeStyles(
  (theme) => ({
    backdrop: {
      backgroundColor:
        theme.palette.mode === 'light' ? 'rgba(250, 250, 250, .9)' : undefined,
      zIndex: 1,
    },

    container: {
      bottom: theme.spacing(2),
      position: 'fixed',
      right: theme.spacing(2),
      zIndex: 2,

      [theme.breakpoints.up('sm')]: {
        bottom: theme.spacing(3),
        right: theme.spacing(3),

        '@supports (padding: max(0px))': {
          right: `max(${theme.spacing(3)}, env(safe-area-inset-right))`,
        },
      },
    },
  }),
  { name: displayName },
);

const CombatHelperButton = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const classes = useStyles();

  const goBack = useGoBack();
  const helperId = useSelector((state) => state.present.combat.helperId);
  const hasOtherPlayers = useSelector(
    (state) => state.present.playerList.length > 1,
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
  const onHelperClick = (event) => {
    event.stopPropagation();
    navigate(
      {
        ...location,
        search: `?add=helper`,
      },
      { replace: true },
    );
  };
  const onMonsterAdd = () => dispatch(addMonster(createMonster()));

  return (
    <>
      <Backdrop className={classes.backdrop} onClick={onBack} open={open} />

      <SpeedDial
        ariaLabel=" "
        className={clsx(classes.container, className)}
        FabProps={{
          color: open ? 'default' : 'primary',
        }}
        icon={helper ? <SpeedDialIcon /> : <EmoticonDevilOutline />}
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
        {...rest}
      >
        <SpeedDialAction
          FabProps={{
            color: 'primary',
          }}
          icon={<EmoticonDevilOutline />}
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
            color: 'primary',
          }}
          icon={<AccountPlus />}
          onClick={onHelperClick}
          tooltipTitle={
            <FormattedMessage defaultMessage="Helper" id="combat.add.helper" />
          }
        />
      </SpeedDial>
    </>
  );
};

CombatHelperButton.displayName = displayName;

export default memo(CombatHelperButton);
