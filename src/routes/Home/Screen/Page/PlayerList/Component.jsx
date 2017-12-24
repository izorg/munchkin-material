import React from 'react';
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

const HomeScreenPagePlayerList = ({ classes, onPlayerMove, playerList }) => (
  <SortableList
    component="div"
    helperClass={classes.sortableHelper}
    lockAxis="y"
    lockOffset={0}
    lockToContainerEdges
    onSortEnd={({ oldIndex, newIndex }) => onPlayerMove(oldIndex, newIndex)}
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
