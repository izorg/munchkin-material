import React from 'react';
import connect from 'react-redux/es/connect/connect';
import compose from 'recompose/compose';
import { goBack } from 'connected-react-router/lib/actions';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';

import noop from '../../../../../../utils/noop';
import { classesObject } from '../../../../../../utils/propTypes';

import Title from '../../../../../../components/Title';
import DiceIconButton from '../../../../../../containers/DiceButton';

const mapStateToProps = state => ({
  title: state.players[state.app.activePlayerId].name,
});

const mapDispatchToProps = {
  onBack: goBack,
};

const styles = {
  leftButton: {
    marginLeft: -12,
  },

  rightButton: {
    marginRight: -12,
  },
};

const PlayerScreenAppBar = ({ classes, onBack, title }) => (
  <AppBar color="primary" position="static">
    <Toolbar>
      <IconButton className={classes.leftButton} color="contrast" onClick={onBack}>
        <NavigationArrowBack />
      </IconButton>

      <Title>
        {title}
      </Title>

      <DiceIconButton
        className={classes.rightButton}
        color="contrast"
      />
    </Toolbar>
  </AppBar>
);

PlayerScreenAppBar.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  onBack: PropTypes.func,
  title: PropTypes.string,
};

PlayerScreenAppBar.defaultProps = {
  onBack: noop,
  title: '',
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(PlayerScreenAppBar);
