import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import { Player } from 'munchkin-core';

import { noop } from '../../../constants';

const HelperSelector = ({ helpers, onSelect, ...props }) => (
  <Dialog
    autoScrollBodyContent
    bodyStyle={{ padding: 0 }}
    {...props}
  >
    <List>
      {helpers.map(helper => (
        <ListItem
          key={helper.id.toString()}
          onTouchTap={() => onSelect(helper.id)}
          primaryText={helper.name}
          secondaryText={
            <p>
              <FormattedMessage
                id="player.list.item.secondaryTextLevel"
                defaultMessage="Level {level}"
                values={{
                  level: <b>{helper.level}</b>,
                }}
              />
              <br />
              <FormattedMessage
                id="player.list.item.secondaryTextStrength"
                defaultMessage="Strength {strength}"
                values={{
                  strength: <b>{helper.strength}</b>,
                }}
              />
            </p>
          }
          secondaryTextLines={2}
        />
      ))}
    </List>
  </Dialog>
);

HelperSelector.propTypes = {
  helpers: PropTypes.arrayOf(PropTypes.instanceOf(Player)),
  onSelect: PropTypes.func,
};

HelperSelector.defaultProps = {
  helpers: [],
  onSelect: noop,
};

export default HelperSelector;
