import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import { Player } from 'munchkin-core';

const HelperSelector = ({ helpers, ...props }) => (
  <Dialog {...props}>
    <List>
      {helpers.map(helper => (
        <ListItem
          key={helper.id.toString()}
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
};

HelperSelector.defaultProps = {
  helpers: [],
};

export default HelperSelector;
