import React, { PureComponent } from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import ActionDelete from 'material-ui-icons/Delete';
import EditorModeEdit from 'material-ui-icons/ModeEdit';
import NavigationCheck from 'material-ui-icons/Check';
import NavigationClose from 'material-ui-icons/Close';

import Empty from './Empty';
import Item from './Item';
import Layout, { LayoutContent, LayoutHeader } from '../../Layout';
import { noop } from '../../../constants';
import { ios } from '../../../helpers/platforms';
import { classesObject, playerInstance } from '../../../utils/propTypes';

const SortableList = SortableContainer(List);
const SortableListItem = SortableElement(Item);

const messages = defineMessages({
  edit: {
    id: 'player.list.edit',
    defaultMessage: 'Edit',
  },
});

const styles = theme => ({
  empty: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  flex: {
    flex: 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },

  sortableHelper: {
    backgroundColor: '#FFFFFF !important',
    boxShadow: theme.shadows[3],
  },
});

class PlayerList extends PureComponent {
  componentWillMount() {
    this.handleItemCheck = this.handleItemCheck.bind(this);
    this.handleItemPress = this.handleItemPress.bind(this);
    this.handleItemTap = this.handleItemTap.bind(this);
    this.handlePlayersDelete = this.handlePlayersDelete.bind(this);
    this.handleSortEnd = this.handleSortEnd.bind(this);
  }

  handleItemCheck(player) {
    const { multiMode, onPlayerSelect, selectedPlayerIds } = this.props;

    onPlayerSelect(player, multiMode, selectedPlayerIds);
  }

  handleItemTap(player) {
    const {
      editMode, multiMode, onPlayerEdit, onPlayerSelect, selectedPlayerIds,
    } = this.props;

    if (editMode) {
      onPlayerEdit(player);
    } else {
      onPlayerSelect(player, multiMode, selectedPlayerIds);
    }
  }

  handleItemPress(player) {
    const { editMode, onMultiSelectActivate } = this.props;

    if (!editMode) {
      onMultiSelectActivate(player.id);
    }
  }

  handlePlayersDelete() {
    const { onDeletePlayers, selectedPlayerIds } = this.props;

    onDeletePlayers(selectedPlayerIds);
  }

  handleSortEnd({ oldIndex, newIndex }) {
    this.props.onPlayerMove(oldIndex, newIndex);
  }

  render() {
    const {
      className,
      classes,
      editMode,
      intl,
      multiMode,
      onMultiSelectDeactivate,
      onToggleEditClick,
      players,
      selectedPlayerIds,
    } = this.props;

    let iconElementLeft = null;
    let iconElementRight = null;
    let title = <FormattedMessage id="player.list.title" defaultMessage="Munchkins" />;
    let titleStyle = {};

    if (players.length) {
      if (multiMode) {
        iconElementLeft = (
          <IconButton color="default" onClick={onMultiSelectDeactivate}>
            <NavigationClose />
          </IconButton>
        );

        iconElementRight = (
          <IconButton color="default" onClick={this.handlePlayersDelete}>
            <ActionDelete />
          </IconButton>
        );
      } else {
        if (ios) {
          titleStyle = {
            marginLeft: 64,
          };
        }

        if (editMode) {
          iconElementRight = (
            <IconButton color="contrast" onClick={onToggleEditClick}>
              <NavigationCheck />
            </IconButton>
          );
        } else {
          const editTitle = intl.formatMessage(messages.edit);

          iconElementRight = (
            <Tooltip title={editTitle}>
              <IconButton
                aria-label={editTitle}
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
      <Layout className={className}>
        <LayoutHeader>
          <AppBar color={multiMode ? 'default' : 'primary'} position="static">
            <Toolbar disableGutters>
              {iconElementLeft}
              <Typography
                className={classes.flex}
                color={multiMode ? 'secondary' : 'inherit'}
                noWrap
                style={titleStyle}
                type="title"
              >
                {title}
              </Typography>
              {iconElementRight}
            </Toolbar>
          </AppBar>
        </LayoutHeader>
        <LayoutContent className={!players.length ? classes.empty : ''}>
          {players.length ? (
            <SortableList
              helperClass={classes.sortableHelper}
              lockAxis="y"
              lockOffset={0}
              lockToContainerEdges
              onSortEnd={this.handleSortEnd}
              useDragHandle
            >
              {players.map((player, index) => (
                <SortableListItem
                  index={index}
                  key={player.id}
                  onCheck={this.handleItemCheck}
                  onPress={this.handleItemPress}
                  onClick={this.handleItemTap}
                  player={player}
                  selected={selectedPlayerIds.includes(player.id)}
                  showCheckbox={multiMode}
                  showDragHandle={editMode}
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
  className: PropTypes.string,
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  editMode: PropTypes.bool,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  multiMode: PropTypes.bool,
  onDeletePlayers: PropTypes.func,
  onMultiSelectActivate: PropTypes.func,
  onMultiSelectDeactivate: PropTypes.func,
  onPlayerEdit: PropTypes.func,
  onPlayerMove: PropTypes.func,
  onPlayerSelect: PropTypes.func,
  onToggleEditClick: PropTypes.func,
  players: PropTypes.arrayOf(playerInstance),
  selectedPlayerIds: PropTypes.arrayOf(PropTypes.number),
};

PlayerList.defaultProps = {
  className: '',
  editMode: false,
  multiMode: false,
  onDeletePlayers: noop,
  onMultiSelectActivate: noop,
  onMultiSelectDeactivate: noop,
  onPlayerEdit: noop,
  onPlayerMove: noop,
  onPlayerSelect: noop,
  onToggleEditClick: noop,
  players: [],
  selectedPlayerIds: [],
};

export default injectIntl(withStyles(styles)(PlayerList));
