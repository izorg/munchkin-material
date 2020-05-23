import {
  Backdrop,
  makeStyles,
  ThemeProvider,
  useTheme,
} from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import clsx from 'clsx';
import deepmerge from 'deepmerge';
import { AccountPlus, EmoticonDevilOutline } from 'mdi-material-ui';
import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSelector } from 'reselect';

import { addMonster } from '../../../ducks/monsters';
import createMonster from '../../../utils/createMonster';
import { useLocationQuery } from '../../../utils/location';

const displayName = 'CombatHelperButton';

const useStyles = makeStyles(
  (theme) => ({
    backdrop: {
      backgroundColor:
        theme.palette.type === 'light' ? 'rgba(250, 250, 250, .9)' : undefined,
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
          right: `max(${theme.spacing(3)}px, env(safe-area-inset-right))`,
        },
      },
    },
  }),
  { name: displayName },
);

const getHelper = createSelector(
  (state) => state.combat.helperId,
  (state) => state.playerList,
  (helperId, playerList) => !helperId && playerList.length > 1,
);

const CombatHelperButton = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const helper = useSelector(getHelper);
  const query = useLocationQuery();
  const open = query.add === null;

  const onAdd = () => history.push(`?add`);
  const onBack = () => history.goBack();
  const onHelperClick = (event) => {
    event.stopPropagation();
    history.replace(`?add=helper`);
  };
  const onMonsterAdd = () => dispatch(addMonster(createMonster()));

  return (
    <>
      {open && <Backdrop className={classes.backdrop} onClick={onBack} open />}

      <ThemeProvider
        theme={deepmerge(theme, {
          overrides: {
            MuiSpeedDialAction: {
              fab: {
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.main,

                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,

                  '@media (hover: none)': {
                    backgroundColor: theme.palette.primary.main,
                  },
                },
              },
            },
          },
        })}
      >
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
            icon={<AccountPlus />}
            onClick={onHelperClick}
            tooltipTitle={
              <FormattedMessage
                defaultMessage="Helper"
                id="combat.add.helper"
              />
            }
          />
        </SpeedDial>
      </ThemeProvider>
    </>
  );
};

CombatHelperButton.displayName = displayName;

export default memo(CombatHelperButton);
