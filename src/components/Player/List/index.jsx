import React, { PureComponent } from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/es/AppBar';
import IconButton from 'material-ui/es/IconButton';
import List from 'material-ui/es/List';
import { withStyles } from 'material-ui/es/styles';
import transitions, { duration, easing } from 'material-ui/es/styles/transitions';
import Toolbar from 'material-ui/es/Toolbar';
import Tooltip from 'material-ui/es/Tooltip';
import ActionDelete from 'material-ui-icons/Delete';
import EditorModeEdit from 'material-ui-icons/ModeEdit';
import NavigationCheck from 'material-ui-icons/Check';
import NavigationClose from 'material-ui-icons/Close';
import cns from 'classnames';

import Empty from './Empty';
import Item from './Item';
import Layout, { LayoutContent, LayoutHeader } from '../../Layout';
import Title from '../../Title';
import { noop } from '../../../constants';
import { ios } from '../../../helpers/platforms';
import { classesObject, playerInstance } from '../../../utils/propTypes';

export const modes = {
  EDIT: 'edit',
  MULTI: 'multi',
};

const SortableList = SortableContainer(List);
const SortableListItem = SortableElement(Item);

const messages = defineMessages({
  edit: {
    id: 'player.list.edit',
    defaultMessage: 'Edit',
  },
});

const styles = theme => ({
  appBar: {
    transition: transitions.create(['background-color'], {
      duration: duration.short,
      easing: easing.sharp,
    }),
  },

  leftButton: {
    marginLeft: -12,
  },

  rightButton: {
    marginRight: -12,
  },

  content: {
    padding: 0,
  },

  empty: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  sortableHelper: {
    backgroundColor: '#FFFFFF !important',
    boxShadow: theme.shadows[3],
    zIndex: 2,
  },
});

class PlayerList extends PureComponent {
  componentWillMount() {
    this.handleItemCheck = this.handleItemCheck.bind(this);
    this.handleItemPress = this.handleItemPress.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleSortEnd = this.handleSortEnd.bind(this);
  }

  handleItemCheck(player) {
    const { onPlayerSelect } = this.props;

    onPlayerSelect(player);
  }

  handleItemClick(player) {
    const {
      mode, onPlayerEdit, onPlayerSelect,
    } = this.props;

    if (mode === modes.EDIT) {
      onPlayerEdit(player);
    } else {
      onPlayerSelect(player);
    }
  }

  handleItemPress(player) {
    const { mode, onMultiSelectActivate } = this.props;

    if (mode !== modes.EDIT) {
      onMultiSelectActivate(player.id);
    }
  }

  handleSortEnd({ oldIndex, newIndex }) {
    this.props.onPlayerMove(oldIndex, newIndex);
  }

  render() {
    const {
      classes,
      intl,
      mode,
      onMultiSelectDeactivate,
      onPlayersDelete,
      onToggleEditClick,
      playerColors,
      players,
      selectedPlayerIds,
    } = this.props;

    const editMode = mode === modes.EDIT;
    const multiMode = mode === modes.MULTI;

    let iconElementLeft = null;
    let iconElementRight = null;
    let title = <FormattedMessage id="player.list.title" defaultMessage="Munchkins" />;
    let titleStyle = {};

    if (players.length) {
      if (multiMode) {
        iconElementLeft = (
          <IconButton className={classes.leftButton} color="default" onClick={onMultiSelectDeactivate}>
            <NavigationClose />
          </IconButton>
        );

        iconElementRight = (
          <IconButton
            className={classes.rightButton}
            color="default"
            onClick={onPlayersDelete}
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
            <IconButton className={classes.rightButton} color="contrast" onClick={onToggleEditClick}>
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
                onClick={onToggleEditClick}
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
      <Layout>
        <LayoutHeader>
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
        </LayoutHeader>
        <LayoutContent className={cns(classes.content, { [classes.empty]: !players.length })}>
          {players.length ? (
            <SortableList
              component="div"
              helperClass={classes.sortableHelper}
              lockAxis="y"
              lockOffset={0}
              lockToContainerEdges
              onSortEnd={this.handleSortEnd}
              useDragHandle
            >
              {players.map((player, index) => (
                <SortableListItem
                  color={playerColors[player.id]}
                  editMode={editMode}
                  index={index}
                  key={player.id}
                  multiMode={multiMode}
                  onCheck={this.handleItemCheck}
                  onClick={this.handleItemClick}
                  onPress={this.handleItemPress}
                  player={player}
                  selected={multiMode && selectedPlayerIds.includes(player.id)}
                />
              ))}
            </SortableList>
          ) : (
            <Empty />
          )}
        </LayoutContent>
      </Layout>
    );
  }
}

PlayerList.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  mode: PropTypes.oneOf(Object.values(modes)),
  onPlayersDelete: PropTypes.func,
  onMultiSelectActivate: PropTypes.func,
  onMultiSelectDeactivate: PropTypes.func,
  onPlayerEdit: PropTypes.func,
  onPlayerMove: PropTypes.func,
  onPlayerSelect: PropTypes.func,
  onToggleEditClick: PropTypes.func,
  playerColors: PropTypes.objectOf(PropTypes.string),
  players: PropTypes.arrayOf(playerInstance),
  selectedPlayerIds: PropTypes.arrayOf(PropTypes.number),
};

PlayerList.defaultProps = {
  mode: null,
  onPlayersDelete: noop,
  onMultiSelectActivate: noop,
  onMultiSelectDeactivate: noop,
  onPlayerEdit: noop,
  onPlayerMove: noop,
  onPlayerSelect: noop,
  onToggleEditClick: noop,
  playerColors: {},
  players: [],
  selectedPlayerIds: [],
};

export default injectIntl(withStyles(styles)(PlayerList));
