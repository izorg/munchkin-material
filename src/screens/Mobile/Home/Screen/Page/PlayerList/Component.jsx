import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { noop } from 'lodash-es';

import Item from './Item';

const SortableList = SortableContainer(List);
const SortableListItem = SortableElement(Item);

const styles = theme => ({
  list: {
    overflowY: 'auto',
  },

  sortableHelper: {
    backgroundColor: '#FFFFFF !important',
    boxShadow: theme.shadows[3],
    zIndex: 2,
  },
});

class HomeScreenPagePlayerList extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSortEnd = this.handleSortEnd.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (this.props.editMode !== nextProps.editMode) {
      // eslint-disable-next-line react/no-find-dom-node
      const node = findDOMNode(this);

      this.scrollTop = node.scrollTop;
    }
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/no-find-dom-node
    const node = findDOMNode(this);

    if (this.scrollTop) {
      node.scrollTop = this.scrollTop;

      delete this.scrollTop;
    }

    if (this.props.playerList.length > prevProps.playerList.length) {
      node.scrollTop = node.scrollHeight;
    }
  }

  handleSortEnd({ oldIndex, newIndex }) {
    this.props.onPlayerMove(oldIndex, newIndex);
  }

  render() {
    const { classes, editMode, playerList } = this.props;

    if (editMode) {
      return (
        <SortableList
          className={classes.list}
          component="div"
          helperClass={classes.sortableHelper}
          lockAxis="y"
          lockOffset={0}
          lockToContainerEdges
          onSortEnd={this.handleSortEnd}
          useDragHandle
        >
          {playerList.map((playerId, index) => (
            <SortableListItem
              index={index}
              key={playerId}
              playerId={playerId}
            />
          ))}
        </SortableList>
      );
    }

    return (
      <List
        className={classes.list}
        component="div"
      >
        {playerList.map((playerId, index) => (
          <Item
            index={index}
            key={playerId}
            playerId={playerId}
          />
        ))}
      </List>
    );
  }
}

HomeScreenPagePlayerList.propTypes = {
  editMode: PropTypes.bool,
  onPlayerMove: PropTypes.func,
  playerList: PropTypes.arrayOf(PropTypes.string),
};

HomeScreenPagePlayerList.defaultProps = {
  editMode: false,
  onPlayerMove: noop,
  playerList: [],
};

export default withStyles(styles)(HomeScreenPagePlayerList);
