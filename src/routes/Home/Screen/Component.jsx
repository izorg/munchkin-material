import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';

import Layout, { LayoutContent, LayoutHeader } from '../../../components/Layout';
import { noop } from '../../../constants';
import { classesObject } from '../../../utils/propTypes';


import AppBar from './AppBar';
import Empty from './Empty';
import Item from './Item';

const SortableList = SortableContainer(List);
const SortableListItem = SortableElement(Item);

const styles = theme => ({
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

const HomeScreenComponent = ({ classes, onPlayerMove, playerList }) => (
  <Layout>
    <LayoutHeader>
      <AppBar />
    </LayoutHeader>
    <LayoutContent className={cns(classes.content, { [classes.empty]: !playerList.length })}>
      {playerList.length ? (
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
      ) : (
        <Empty />
      )}
    </LayoutContent>
  </Layout>
);

HomeScreenComponent.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  onPlayerMove: PropTypes.func,
  playerList: PropTypes.arrayOf(PropTypes.number),
};

HomeScreenComponent.defaultProps = {
  onPlayerMove: noop,
  playerList: [],
};

export default withStyles(styles)(HomeScreenComponent);
