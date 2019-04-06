import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Backdrop, MuiThemeProvider, withStyles } from '@material-ui/core';
import { SpeedDial, SpeedDialIcon } from '@material-ui/lab';
import { AccountPlus, EmoticonDevilOutline } from 'mdi-material-ui';
import clsx from 'clsx';
import deepmerge from 'deepmerge';

import Zoom from '../../../components/transitions/Zoom';

import HelperButtonAction from './Action';

const styles = (theme) => ({
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
});

const CombatHelperButton = ({
  classes,
  className,
  helper,
  onAdd,
  onBack,
  onHelperClick,
  onMonsterAdd,
  open,
  theme,
  ...rest
}) => (
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
        TransitionComponent={Zoom}
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
            <FormattedMessage defaultMessage="Helper" id="combat.add.helper" />
          }
        />
      </SpeedDial>
    </MuiThemeProvider>

    {open && <Backdrop className={classes.backdrop} onClick={onBack} open />}
  </>
);

CombatHelperButton.propTypes = {
  helper: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onHelperClick: PropTypes.func.isRequired,
  onMonsterAdd: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

CombatHelperButton.defaultProps = {
  helper: false,
  open: false,
};

export default withStyles(styles, { withTheme: true })(CombatHelperButton);
