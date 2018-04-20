import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';
import { noop } from 'lodash';

import Item from './Item';

const SortableList = SortableContainer(List);
const SortableListItem = SortableElement(Item);

const styles = (theme) => ({
  list: {
    overflowY: 'auto',
    paddingBottom: 56,
    touchAction: 'pan-y',
  },

  sortableHelper: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[3],
    pointerEvents: 'auto !important',

    '& > div': {
      pointerEvents: 'none',
    },
  },
});

class HomeScreenPagePlayerList extends PureComponent {
  static handleRef(list) {
    if (list) {
      // eslint-disable-next-line no-param-reassign
      list.document = { body: list.container }; // dirty hack to render helper inside list
    }
  }

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
    const {
      classes,
      className: classNameProp,
      editMode,
      playerList,
    } = this.props;

    const className = cns(classNameProp, classes.list);

    if (editMode) {
      return (
        <SortableList
          className={className}
          helperClass={classes.sortableHelper}
          lockAxis="y"
          lockToContainerEdges
          onSortEnd={this.handleSortEnd}
          ref={HomeScreenPagePlayerList.handleRef}
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
      <List className={className}>
        {playerList.map((playerId, index) => (
          <Item index={index} key={playerId} playerId={playerId} />
        ))}
      </List>
    );
  }
}

HomeScreenPagePlayerList.propTypes = {
  className: PropTypes.string,
  editMode: PropTypes.bool,
  onPlayerMove: PropTypes.func,
  playerList: PropTypes.arrayOf(PropTypes.string),
};

HomeScreenPagePlayerList.defaultProps = {
  className: '',
  editMode: false,
  onPlayerMove: noop,
  playerList: [],
};

export default withStyles(styles)(HomeScreenPagePlayerList);
