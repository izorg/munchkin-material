import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import cns from 'classnames';

const styles = (theme) => ({
  root: {
    display: 'block',
    position: 'relative',
  },

  tooltip: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[400]}`,
    borderBottomWidth: 2,
    borderRadius: theme.spacing.unit,
    color: theme.palette.grey[600],
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 'bold',
    lineHeight: `${theme.typography.round(14 / 10)}em`,
    padding: `${theme.spacing.unit / 4 + 1}px ${theme.spacing.unit}px ${theme
      .spacing.unit /
      4 -
      1}px`,
    position: 'absolute',
    right: 66,
    top: 5,
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
      <Fade
        in={inProp}
        mountOnEnter
        timeout={theme.transitions.duration.shorter}
        unmountOnExit
      >
        <div className={cns(classes.root, className)}>
          <Button color="primary" mini variant="fab" {...props}>
            {children}
          </Button>

          <div className={classes.tooltip}>{title}</div>
        </div>
      </Fade>
    );
  }
}

Action.propTypes = {
  children: PropTypes.node.isRequired,
  in: PropTypes.bool.isRequired,
  title: PropTypes.node.isRequired,
};

export default withStyles(styles, { withTheme: true })(Action);
