import { ListItemIcon } from '@material-ui/core';
import { ShareVariant } from 'mdi-material-ui';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const displayName = 'ShareItem';

const messages = defineMessages({
  share: {
    id: 'menu.share',
    defaultMessage: 'Share',
  },

  text: {
    id: 'share.text',
    defaultMessage: 'Simple but powerful Munchkin level counter',
  },
});

const ShareItem = (props) => {
  const navigate = useNavigate();
  const intl = useIntl();

  const {
    cordova,
    location: { host, pathname, protocol },
  } = window;

  const shareLink = cordova
    ? 'https://allmunchkins.com'
    : `${protocol}//${host}${pathname}`;

  if (!navigator.share) {
    return null;
  }

  const onClick = async () => {
    try {
      await navigator.share({
        text: intl.formatMessage(messages.text),
        title: intl.formatMessage(messages.share),
        url: shareLink,
      });
      navigate(-1);
    } catch (error) {
      // cancel share
    }
  };

  return (
    <ListItem button onClick={onClick} {...props}>
      <ListItemIcon>
        <ShareVariant />
      </ListItemIcon>
      <ListItemText primary={intl.formatMessage(messages.share)} />
    </ListItem>
  );
};

ShareItem.displayName = displayName;

export default ShareItem;
