import React from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import connect from 'react-redux/es/connect/connect';
import withRouter from 'react-router-dom/es/withRouter';
import { goBack, push } from 'connected-react-router/lib/actions';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';
import NavigationCheck from 'material-ui-icons/Check';
import NavigationClose from 'material-ui-icons/Close';
import ActionDelete from 'material-ui-icons/Delete';
import EditorModeEdit from 'material-ui-icons/ModeEdit';
import { removePlayer } from 'munchkin-core/es/actions';

import { unselectAllPlayers } from '../../../../../actions';
import Title from '../../../../../components/Title';
import { noop } from '../../../../../constants';
import { ios } from '../../../../../utils/platforms';
import { classesObject } from '../../../../../utils/propTypes';

import * as modes from '../../../modes';
import { getModeFromPathname } from '../../../path';

const mapStateToProps = state => ({
  empty: state.playerList.length === 0,
  mode: getModeFromPathname(state.router.location.pathname),
  selectedPlayerIds: state.app.selectedPlayerIds,
});

const mapDispatchToProps = {
  onMultiSelectDeactivate: () => (dispatch) => {
    dispatch(unselectAllPlayers());
    dispatch(goBack());
  },
  onPlayersDelete: selectedPlayerIds => (dispatch) => {
    selectedPlayerIds.forEach((id) => {
      dispatch(removePlayer(id));
    });
    dispatch(goBack());
  },
  onToggleEditClick: mode => (dispatch) => {
    if (mode === modes.EDIT) {
      dispatch(goBack());
    } else {
      dispatch(push(`/${modes.EDIT}`));
    }
  },
};

const messages = defineMessages({
  edit: {
    id: 'player.list.edit',
    defaultMessage: 'Edit',
  },
});

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.sharp,
    }),
  },

  leftButton: {
    marginLeft: -12,
  },

  rightButton: {
    marginRight: -12,
  },
});

const HomeScreenPageAppBar = ({
  classes,
  empty,
  intl,
  mode,
  onMultiSelectDeactivate,
  onPlayersDelete,
  onToggleEditClick,
  selectedPlayerIds,
}) => {
  const editMode = mode === modes.EDIT;
  const multiMode = mode === modes.MULTI;

  let iconElementLeft = null;
  let iconElementRight = null;
  let title = <FormattedMessage id="player.list.title" defaultMessage="Munchkins" />;
  let titleStyle = {};

  if (!empty) {
    if (multiMode) {
      iconElementLeft = (
        <IconButton
          className={classes.leftButton}
          color="default"
          onClick={onMultiSelectDeactivate}
        >
          <NavigationClose />
        </IconButton>
      );

      iconElementRight = (
        <IconButton
          className={classes.rightButton}
          color="default"
          onClick={() => onPlayersDelete(selectedPlayerIds)}
        >
          <ActionDelete />
        </IconButton>
      );

      if (!ios) {
        titleStyle = {
          ...titleStyle,
          marginLeft: 20,
        };
      }
    } else {
      if (ios) {
        titleStyle = {
          ...titleStyle,
          marginLeft: 48,
        };
      }

      if (editMode) {
        iconElementRight = (
          <IconButton
            className={classes.rightButton}
            color="contrast"
            onClick={() => onToggleEditClick(mode)}
          >
            <NavigationCheck />
          </IconButton>
        );
      } else {
        const editTitle = intl.formatMessage(messages.edit);

        iconElementRight = (
          <Tooltip title={editTitle}>
            <IconButton
              aria-label={editTitle}
              className={classes.rightButton}
              color="contrast"
              onClick={() => onToggleEditClick(mode)}
            >
              <EditorModeEdit />
            </IconButton>
          </Tooltip>
        );
      }
    }
  }

  if (multiMode) {
    title = selectedPlayerIds.length;
  }

  return (
    <AppBar className={classes.appBar} color={multiMode ? 'default' : 'primary'} position="static">
      <Toolbar>
        {iconElementLeft}
        <Title
          color={multiMode ? 'default' : 'inherit'}
          style={titleStyle}
        >
          {title}
        </Title>
        {iconElementRight}
      </Toolbar>
    </AppBar>
  );
};

HomeScreenPageAppBar.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  empty: PropTypes.bool,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  mode: PropTypes.oneOf(Object.values(modes)),
  onMultiSelectDeactivate: PropTypes.func,
  onPlayersDelete: PropTypes.func,
  onToggleEditClick: PropTypes.func,
  selectedPlayerIds: PropTypes.arrayOf(PropTypes.string),
};

HomeScreenPageAppBar.defaultProps = {
  empty: false,
  mode: null,
  onMultiSelectDeactivate: noop,
  onPlayersDelete: noop,
  onToggleEditClick: noop,
  selectedPlayerIds: [],
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withStyles(styles),
)(HomeScreenPageAppBar);
