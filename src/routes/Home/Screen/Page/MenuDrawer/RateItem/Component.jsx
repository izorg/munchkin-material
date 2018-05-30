import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Star from '@material-ui/icons/Star';

const RateItem = ({ rateLink, ...rest }) =>
  rateLink && (
    <ListItem {...rest} component="a" button href={rateLink} target="_blank">
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
  rateLink: PropTypes.string,
};

RateItem.defaultProps = {
  rateLink: null,
};

export default RateItem;
