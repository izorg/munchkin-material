import { ListItemIcon } from '@material-ui/core';
import { goBack } from 'connected-react-router';
import { Star } from 'mdi-material-ui';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { useOptions } from '../../../OptionsProvider';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const RateItem = (props) => {
  const dispatch = useDispatch();

  const { rateLink } = useOptions();

  if (!rateLink) {
    return null;
  }

  const onClick = () => dispatch(goBack());

  return (
    <ListItem
      button
      component="a"
      href={rateLink}
      onClick={onClick}
      target="_blank"
      {...props}
    >
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
};

export default RateItem;
