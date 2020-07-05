import { ListItemIcon } from '@material-ui/core';
import { Star } from 'mdi-material-ui';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const displayName = 'RateItem';

const getRateLink = (platformId) => {
  switch (platformId) {
    case 'android':
      return 'market://details?id=com.izorg.munchkin';

    case 'ios':
      return 'itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=1448937097';

    default:
      return null;
  }
};

const RateItem = (props) => {
  const navigate = useNavigate();

  const rateLink = getRateLink(window.cordova?.platformId);

  if (!rateLink) {
    return null;
  }

  const onClick = () => navigate(-1);

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

RateItem.displayName = displayName;

export default RateItem;
