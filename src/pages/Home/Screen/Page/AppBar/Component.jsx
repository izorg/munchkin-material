import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';
import NavigationCheck from 'material-ui-icons/Check';
import NavigationClose from 'material-ui-icons/Close';
import ActionDelete from 'material-ui-icons/Delete';
import EditorModeEdit from 'material-ui-icons/ModeEdit';
import { noop } from 'lodash-es';

import AppBar from '../../../../../components/AppBar';
import DiceButton from '../../../../../components/dice/Button';
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
  multiTitle: {
    marginLeft: 20,
  },

  title: {
    marginLeft: theme.spacing.unit * 2,
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
  const buttonColor = multiMode ? 'default' : 'inherit';

  let title = <PlayerListTitleMessage />;

  if (multiMode) {
    title = selectedPlayerIds.length;
  }

  const editTitle = intl.formatMessage(messages.edit);

  return (
    <AppBar color={multiMode ? 'default' : 'primary'} position="static">
      {multiMode && (
        <IconButton
          color="default"
          onClick={onMultiSelectDeactivate}
        >
          <NavigationClose />
        </IconButton>
      )}
      <Title
        color={multiMode ? 'default' : 'inherit'}
        className={multiMode ? classes.multiTitle : classes.title}
      >
        {title}
      </Title>

      <DiceButton color={buttonColor} />

      {!empty && !multiMode && (
        <Tooltip title={editTitle}>
          <IconButton
            aria-label={editTitle}
            color={buttonColor}
            onClick={() => onToggleEditClick(mode)}
          >
            {editMode ? <NavigationCheck /> : <EditorModeEdit />}
          </IconButton>
        </Tooltip>
      )}

      {multiMode && (
        <IconButton
          color={buttonColor}
          onClick={() => onPlayersDelete(selectedPlayerIds)}
        >
          <ActionDelete />
        </IconButton>
      )}
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
