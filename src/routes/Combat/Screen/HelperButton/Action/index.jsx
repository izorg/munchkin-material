import React, { PureComponent } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';

const styles = (theme) => ({
  button: {},

  tooltipContainer: {
    display: 'block',
  },

  enter: {
    '& $button': {
      opacity: 0,
      transform: 'scale(0.5) translateY(20px)',
    },
  },

  enterActive: {
    '& $button': {
      opacity: 1,
      transform: 'scale(1) translateY(0)',
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeIn,
      }),
    },
  },

  exit: {
    '& $button': {
      opacity: 1,
      transform: 'scale(1)',
    },
  },

  exitActive: {
    '& $button': {
      opacity: 0,
      transform: 'scale(0.8)',
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeOut,
      }),
    },
  },

  tooltip: {
    backgroundColor: '#FFFFFF',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderBottomWidth: 2,
    borderRadius: theme.spacing.unit,
    color: theme.palette.grey[600],
    fontWeight: 'bold',
    opacity: 1,
  },
});

class Action extends PureComponent {
  render() {
    const {
      children,
      classes,
      className,
      in: inProp,
      theme,
      title,
      ...props
    } = this.props;

    return (
      <CSSTransition
        classNames={{
          enter: classes.enter,
          enterActive: classes.enterActive,
          exit: classes.exit,
          exitActive: classes.exitActive,
        }}
        in={inProp}
        mountOnEnter
        timeout={{
          enter: theme.transitions.duration.shortest,
          exit: theme.transitions.duration.shortest,
        }}
        unmountOnExit
      >
        <Tooltip
          classes={{
            tooltip: classes.tooltip,
          }}
          open={inProp}
          placement="left"
          title={title}
        >
          <div className={cns(classes.tooltipContainer, className)}>
            <Button
              className={classes.button}
              color="primary"
              mini
              variant="fab"
              {...props}
            >
              {children}
            </Button>
          </div>
        </Tooltip>
      </CSSTransition>
    );
  }
}

Action.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  in: PropTypes.bool.isRequired,
  title: PropTypes.node.isRequired,
};

Action.defaultProps = {
  className: '',
};

export default withStyles(styles, { withTheme: true })(Action);
