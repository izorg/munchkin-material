import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { Star } from '@material-ui/icons';

import ListItem from '../Item';

const RateItem = ({ rateLink, ...rest }) => (
  <ListItem button component="a" href={rateLink} target="_blank" {...rest}>
    <ListItemIcon>
      <Star />
    </ListItemIcon>
    <ListItemText
      primary={
        <FormattedMessage defaultMessage="Rate the app" id="menu.rateApp" />
      }
    />
  </ListItem>
);

RateItem.propTypes = {
  rateLink: PropTypes.string.isRequired,
};

export default RateItem;
