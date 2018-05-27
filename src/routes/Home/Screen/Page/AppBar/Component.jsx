import React from 'react';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import NavigationCheck from '@material-ui/icons/Check';
import NavigationClose from '@material-ui/icons/Close';
import ActionDelete from '@material-ui/icons/Delete';
import EditorModeEdit from '@material-ui/icons/ModeEdit';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import { noop } from 'lodash';

import AppBar from '../../../../../components/AppBar';
import DiceButton from '../../../../../components/dice/Button';
import FlagCheckeredIcon from '../../../../../components/icons/FlagCheckered';
import Title from '../../../../../components/Title';

import * as modes from '../../../modes';
import modeShape from '../../../modeShape';

import MenuButton from './MenuButton';

const messages = defineMessages({
  edit: {
    id: 'player.list.edit',
    defaultMessage: 'Edit',
  },
});

const styles = {
  leftButton: {
    marginRight: 8,
  },

  title: {
    marginLeft: 12,
  },
};

const HomeAppBar = ({
  classes,
  empty,
  intl,
  mode,
  onMultiSelectDeactivate,
  onPlayersDelete,
  onResetPlayer,
  onToggleEditClick,
  onTurnFinish,
  selectedPlayerIds,
  singleMode,
}) => {
  const editMode = mode === modes.EDIT;
  const multiMode = mode === modes.MULTI;
  const buttonColor = multiMode ? 'default' : 'inherit';

  const editTitle = intl.formatMessage(messages.edit);

  let title = (
    <FormattedMessage id="player.list.title" defaultMessage="Munchkins" />
  );

  if (multiMode) {
    title = selectedPlayerIds.length;
  }

  if (singleMode) {
    title = (
      <FormattedMessage id="home.single.title" defaultMessage="Munchkin" />
    );
  }

  return (
    <AppBar color={multiMode ? 'default' : 'primary'}>
      {multiMode ? (
        <IconButton
          className={classes.leftButton}
          color="default"
          onClick={onMultiSelectDeactivate}
        >
          <NavigationClose />
        </IconButton>
      ) : (
        <MenuButton className={classes.leftButton} color="inherit" />
      )}
      <Title
        color={multiMode ? 'default' : 'inherit'}
        className={classes.title}
      >
        {title}
      </Title>

      {singleMode && (
        <IconButton color="inherit" onClick={onResetPlayer}>
          <SettingsBackupRestoreIcon />
        </IconButton>
      )}

      {(!mode || singleMode) && <DiceButton color={buttonColor} />}

      {!empty &&
        !multiMode &&
        !singleMode && (
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

      {singleMode && (
        <IconButton color="inherit" onClick={onTurnFinish}>
          <FlagCheckeredIcon />
        </IconButton>
      )}
    </AppBar>
  );
};

HomeAppBar.propTypes = {
  empty: PropTypes.bool,
  intl: intlShape.isRequired,
  mode: modeShape,
  onMultiSelectDeactivate: PropTypes.func,
  onPlayersDelete: PropTypes.func,
  onResetPlayer: PropTypes.func,
  onToggleEditClick: PropTypes.func,
  onTurnFinish: PropTypes.func,
  selectedPlayerIds: PropTypes.arrayOf(PropTypes.string),
  singleMode: PropTypes.bool,
};

HomeAppBar.defaultProps = {
  empty: false,
  mode: null,
  onMultiSelectDeactivate: noop,
  onPlayersDelete: noop,
  onResetPlayer: noop,
  onToggleEditClick: noop,
  onTurnFinish: noop,
  selectedPlayerIds: [],
  singleMode: false,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(HomeAppBar);
