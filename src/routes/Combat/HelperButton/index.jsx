import React, { memo } from 'react';
import { goBack, push, replace } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Backdrop, makeStyles, MuiThemeProvider } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { SpeedDial, SpeedDialIcon } from '@material-ui/lab';
import { AccountPlus, EmoticonDevilOutline } from 'mdi-material-ui';
import clsx from 'clsx';
import deepmerge from 'deepmerge';
import { flow, get, isNull } from 'lodash/fp';

import { addMonster } from '../../../ducks/monsters';
import createMonster from '../../../utils/createMonster';
import { getQuery } from '../../../utils/location';

import HelperButtonAction from './Action';

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
  { name: 'CombatHelperButton' },
);

const getHelper = createSelector(
  get(['combat', 'helperId']),
  get('playerList'),
  (helperId, playerList) => !helperId && playerList.length > 1,
);

const getOpen = flow(
  getQuery,
  get('add'),
  isNull,
);

const CombatHelperButton = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const helper = useSelector(getHelper);
  const open = useSelector(getOpen);

  const onAdd = () => dispatch(push(`?add`));
  const onBack = () => dispatch(goBack());
  const onHelperClick = () => dispatch(replace(`?add=helper`));
  const onMonsterAdd = () => dispatch(addMonster(createMonster()));

  return (
    <>
      <MuiThemeProvider
        theme={deepmerge(theme, {
          overrides: {
            MuiSpeedDialAction: {
              button: {
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
          ButtonProps={{
            color: open ? 'default' : 'primary',
          }}
          className={clsx(classes.container, className)}
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
          <HelperButtonAction
            icon={<EmoticonDevilOutline />}
            onClick={() => {
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
          <HelperButtonAction
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
      </MuiThemeProvider>

      {open && <Backdrop className={classes.backdrop} onClick={onBack} open />}
    </>
  );
};

CombatHelperButton.displayName = 'CombatHelperButton';

export default memo(CombatHelperButton);
