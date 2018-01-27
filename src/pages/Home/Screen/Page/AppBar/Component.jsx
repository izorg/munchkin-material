import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
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
import { noop } from 'lodash-es';

import PlayerListTitleMessage from '../../../../../components/PlayerListTitleMessage';
import Title from '../../../../../components/Title';

import * as modes from '../../../modes';

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

const HomeScreenPageAppBarComponent = ({
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
  let title = <PlayerListTitleMessage />;
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

      titleStyle = {
        ...titleStyle,
        marginLeft: 20,
      };
    } else if (editMode) {
      iconElementRight = (
        <IconButton
          className={classes.rightButton}
          color="inherit"
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
            color="inherit"
            onClick={() => onToggleEditClick(mode)}
          >
            <EditorModeEdit />
          </IconButton>
        </Tooltip>
      );
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

HomeScreenPageAppBarComponent.propTypes = {
  empty: PropTypes.bool,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  mode: PropTypes.oneOf(Object.values(modes)),
  onMultiSelectDeactivate: PropTypes.func,
  onPlayersDelete: PropTypes.func,
  onToggleEditClick: PropTypes.func,
  selectedPlayerIds: PropTypes.arrayOf(PropTypes.string),
};

HomeScreenPageAppBarComponent.defaultProps = {
  empty: false,
  mode: null,
  onMultiSelectDeactivate: noop,
  onPlayersDelete: noop,
  onToggleEditClick: noop,
  selectedPlayerIds: [],
};

export default compose(
  injectIntl,
  withStyles(styles),
)(HomeScreenPageAppBarComponent);
