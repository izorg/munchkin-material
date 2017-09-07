import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';

import { noop } from '../../../constants';
import { playerInstance } from '../../../utils/propTypes';

import cn from './style.css';

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
          onClick={() => onSelect(helper.id)}
          primaryText={<div className={cn.name}>{helper.name}</div>}
          secondaryText={
            <p>
              <FormattedMessage
                id="combat.helperSelector.level"
                defaultMessage="Level {level}"
                values={{
                  level: <b>{helper.level}</b>,
                }}
              />
              <br />
              <FormattedMessage
                id="combat.helperSelector.strength"
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
  helpers: PropTypes.arrayOf(playerInstance),
  onSelect: PropTypes.func,
};

HelperSelector.defaultProps = {
  helpers: [],
  onSelect: noop,
};

export default HelperSelector;
