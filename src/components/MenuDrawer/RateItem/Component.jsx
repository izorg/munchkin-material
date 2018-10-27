import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Star from '@material-ui/icons/Star';

const RateItem = ({ rateLink, ...rest }) => (
  <ListItem component="a" button href={rateLink} target="_blank" {...rest}>
    <ListItemIcon>
      <Star />
    </ListItemIcon>
    <ListItemText
      primary={
        <FormattedMessage id="menu.rateApp" defaultMessage="Rate the app" />
      }
    />
  </ListItem>
);

RateItem.propTypes = {
  rateLink: PropTypes.string.isRequired,
};

export default RateItem;
