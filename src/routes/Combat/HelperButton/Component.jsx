import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Backdrop, MuiThemeProvider, withStyles } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { PersonAdd } from '@material-ui/icons';
import { EmoticonDevilOutline } from 'mdi-material-ui';
import cns from 'classnames';
import deepmerge from 'deepmerge';
import { delay, noop } from 'lodash/fp';

import Zoom from '../../../components/transitions/Zoom';

const styles = (theme) => ({
  backdrop: {
    backgroundColor:
      theme.palette.type === 'light' ? 'rgba(250, 250, 250, .9)' : undefined,
    zIndex: 1,
  },

  container: {
    bottom: theme.spacing.unit * 2,
    position: 'fixed',
    right: theme.spacing.unit * 2,
    zIndex: 2,

    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing.unit * 3,
      right: theme.spacing.unit * 3,

      '@supports(padding: max(0px))': {
        right: `max(${theme.spacing.unit * 3}px, env(safe-area-inset-right))`,
      },
    },
  },
});

class CombatHelperButton extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      helper,
      onAdd,
      onBackdropClick,
      onMonsterAdd,
      open,
      playerId,
    } = this.props;

    if (open) {
      onBackdropClick();
    } else if (helper) {
      onAdd(playerId);
    } else {
      onMonsterAdd();
    }
  }

  render() {
    const {
      classes,
      className,
      helper,
      onAdd,
      onBackdropClick,
      onHelperClick,
      onMonsterAdd,
      open,
      playerId,
      theme,
      ...rest
    } = this.props;

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
            className={cns(classes.container, className)}
            icon={helper ? <SpeedDialIcon /> : <EmoticonDevilOutline />}
            onClick={this.handleClick}
            open={open}
            TransitionComponent={Zoom}
            {...rest}
          >
            <SpeedDialAction
              icon={<EmoticonDevilOutline />}
              onClick={() => onMonsterAdd(true)}
              tooltipTitle={
                <FormattedMessage
                  defaultMessage="Monster"
                  id="combat.add.monster"
                />
              }
            />
            <SpeedDialAction
              icon={<PersonAdd />}
              onClick={() => delay(100, () => onHelperClick(playerId))}
              tooltipTitle={
                <FormattedMessage
                  defaultMessage="Helper"
                  id="combat.add.helper"
                />
              }
            />
          </SpeedDial>
        </MuiThemeProvider>

        {open && (
          <Backdrop
            classes={{
              root: classes.backdrop,
            }}
            onClick={onBackdropClick}
            open
          />
        )}
      </>
    );
  }
}

CombatHelperButton.propTypes = {
  helper: PropTypes.bool,
  onAdd: PropTypes.func,
  onBackdropClick: PropTypes.func,
  onHelperClick: PropTypes.func,
  onMonsterAdd: PropTypes.func,
  open: PropTypes.bool,
  playerId: PropTypes.string.isRequired,
};

CombatHelperButton.defaultProps = {
  helper: false,
  onAdd: noop,
  onBackdropClick: noop,
  onHelperClick: noop,
  onMonsterAdd: noop,
  open: false,
};

export default withStyles(styles, { withTheme: true })(CombatHelperButton);
