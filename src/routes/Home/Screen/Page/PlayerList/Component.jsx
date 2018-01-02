import React, { PureComponent } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import { noop } from '../../../../../constants';
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
    const { classes, playerList } = this.props;

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
}

HomeScreenPagePlayerList.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  onPlayerMove: PropTypes.func,
  playerList: PropTypes.arrayOf(PropTypes.string),
};

HomeScreenPagePlayerList.defaultProps = {
  onPlayerMove: noop,
  playerList: [],
};

export default withStyles(styles)(HomeScreenPagePlayerList);
