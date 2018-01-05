import React, { PureComponent } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import noop from '../../../../../utils/noop';
import { classesObject } from '../../../../../utils/propTypes';

import Item from './Item';

const SortableList = SortableContainer(List);
const SortableListItem = SortableElement(Item);

const styles = theme => ({
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

  handleSortEnd({ oldIndex, newIndex }) {
    this.props.onPlayerMove(oldIndex, newIndex);
  }

  render() {
    const { classes, editMode, playerList } = this.props;

    if (editMode) {
      return (
        <SortableList
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
      <List component="div">
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
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
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
