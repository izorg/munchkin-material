import React, { Fragment, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import cns from 'classnames';
import deepmerge from 'deepmerge';
import { noop } from 'lodash/fp';

import EmoticonDevil from '../../../../components/icons/EmoticonDevil';

const styles = (theme) => ({
  backdrop: {
    backgroundColor: 'rgba(250, 250, 250, .9)',
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

  button: {
    bottom: 0,
    left: 0,
    position: 'relative',
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
      <Fragment>
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
              MuiTooltip: {
                tooltip: {
                  backgroundColor: theme.palette.common.white,
                  border: `1px solid ${theme.palette.grey[400]}`,
                  borderBottomWidth: 2,
                  borderRadius: theme.spacing.unit,
                  color: theme.palette.grey[600],
                  fontSize: theme.typography.pxToRem(14),
                  fontWeight: 'bold',
                  lineHeight: `${theme.typography.round(14 / 10)}em`,
                  padding: `${theme.spacing.unit / 4 + 1}px ${
                    theme.spacing.unit
                  }px ${theme.spacing.unit / 4 - 1}px`,
                },

                tooltipPlacementLeft: {
                  margin: `0 ${theme.spacing.unit * 3}px`,
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
            icon={helper ? <SpeedDialIcon /> : <EmoticonDevil />}
            onClick={this.handleClick}
            open={open}
            {...rest}
          >
            <SpeedDialAction
              icon={<PersonAddIcon />}
              onClick={() => onHelperClick(playerId)}
              tooltipTitle={
                <FormattedMessage
                  id="combat.add.helper"
                  defaultMessage="Helper"
                />
              }
              tooltipOpen
            />
            <SpeedDialAction
              icon={<EmoticonDevil />}
              onClick={() => onMonsterAdd(true)}
              tooltipTitle={
                <FormattedMessage
                  id="combat.add.monster"
                  defaultMessage="Monster"
                />
              }
              tooltipOpen
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
      </Fragment>
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
