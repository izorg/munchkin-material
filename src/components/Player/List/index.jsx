import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { List } from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { grey600 } from 'material-ui/styles/colors';
import { Player } from 'munchkin';

import cn from './style.css';

import Item from './Item';
import AppBar from '../../material-ui/AppBar';
import { Layout, LayoutContent, LayoutHeader } from '../../Layout';
import MainButton from '../../../containers/MainButton';
import { noop } from '../../../constants';

const SortableList = SortableContainer(List);
const SortableListItem = SortableElement(Item);

class PlayerList extends Component {
  componentWillMount() {
    this.handleItemCheck = this.handleItemCheck.bind(this);
    this.handleItemPress = this.handleItemPress.bind(this);
    this.handleItemTap = this.handleItemTap.bind(this);
    this.handleLeftIconButtonTouchTap = this.handleLeftIconButtonTouchTap.bind(this);
    this.handleRightIconButtonTouchTap = this.handleRightIconButtonTouchTap.bind(this);
    this.handleSortEnd = this.handleSortEnd.bind(this);
  }

  handleLeftIconButtonTouchTap() {
    const { multiMode, onMultiSelectDeactivate } = this.props;

    if (multiMode) {
      onMultiSelectDeactivate();
    }
  }

  handleRightIconButtonTouchTap() {
    const { multiMode, onDeletePlayers, onToggleEditClick, selectedPlayerIds } = this.props;

    if (multiMode) {
      onDeletePlayers(selectedPlayerIds);
    } else {
      onToggleEditClick();
    }
  }

  handleItemCheck(player) {
    const { multiMode, onPlayerSelect, selectedPlayerIds } = this.props;

    onPlayerSelect(player, multiMode, selectedPlayerIds);
  }

  handleItemTap(player) {
    const { editMode, multiMode, onPlayerEdit, onPlayerSelect, selectedPlayerIds } = this.props;

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

  handleSortEnd({ oldIndex, newIndex }) {
    this.props.onPlayerMove(oldIndex, newIndex);
  }

  render() {
    const { editMode, multiMode, players, selectedPlayerIds } = this.props;

    let showMenuIconButton = false;
    let iconElementLeft = null;
    let iconElementRight = null;
    let title = <FormattedMessage id="player.list.title" defaultMessage="Munchkins" />;

    if (players.length) {
      if (multiMode) {
        showMenuIconButton = true;

        iconElementLeft = (
          <IconButton>
            <NavigationClose />
          </IconButton>
        );

        iconElementRight = (
          <IconButton>
            <ActionDelete />
          </IconButton>
        );
      } else {
        iconElementRight = (
          <IconButton>
            {editMode ? <NavigationCheck /> : <EditorModeEdit />}
          </IconButton>
        );
      }
    }

    const appBarStyle = {};

    if (multiMode) {
      appBarStyle.backgroundColor = grey600;
      title = selectedPlayerIds.length;
    }

    return (
      <Layout>
        <LayoutHeader>
          <AppBar
            iconElementLeft={iconElementLeft}
            iconElementRight={iconElementRight}
            onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap}
            onRightIconButtonTouchTap={this.handleRightIconButtonTouchTap}
            showMenuIconButton={showMenuIconButton}
            style={appBarStyle}
            title={title}
          />
        </LayoutHeader>
        <LayoutContent>
          <SortableList
            helperClass={cn.sortableHelper}
            lockAxis="y"
            lockOffset={0}
            lockToContainerEdges
            onSortEnd={this.handleSortEnd}
            pressDelay={1} // to disable hover state in item component
            useDragHandle
          >
            {players.map((player, index) => (
              <SortableListItem
                index={index}
                key={player.id}
                onCheck={this.handleItemCheck}
                onPress={this.handleItemPress}
                onTouchTap={this.handleItemTap}
                player={player}
                selected={selectedPlayerIds.includes(player.id)}
                showCheckbox={multiMode}
                showDragHandle={editMode}
              />
            ))}
          </SortableList>

          <CSSTransitionGroup
            className={cn.fabContainer}
            component="div"
            transitionAppear
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
            transitionName={{
              appear: cn.fabAppear,
              appearActive: cn.fabAppearActive, // eslint-disable-line css-modules/no-undef-class
            }}
          >
            <div className={cn.fab}>
              <MainButton />
            </div>
          </CSSTransitionGroup>
        </LayoutContent>
      </Layout>
    );
  }
}

PlayerList.propTypes = {
  editMode: PropTypes.bool,
  multiMode: PropTypes.bool,
  onDeletePlayers: PropTypes.func,
  onMultiSelectActivate: PropTypes.func,
  onMultiSelectDeactivate: PropTypes.func,
  onPlayerEdit: PropTypes.func,
  onPlayerMove: PropTypes.func,
  onPlayerSelect: PropTypes.func,
  onToggleEditClick: PropTypes.func,
  players: PropTypes.arrayOf(PropTypes.instanceOf(Player)),
  selectedPlayerIds: PropTypes.arrayOf(PropTypes.number),
};

PlayerList.defaultProps = {
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

export default PlayerList;
