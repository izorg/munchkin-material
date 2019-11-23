import { ListItemIcon } from '@material-ui/core';
import { goBack } from 'connected-react-router';
import { ShareVariant } from 'mdi-material-ui';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { useConfig } from '../../../ConfigProvider';

import ListItem from '../Item';
import ListItemText from '../ItemText';

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
  const dispatch = useDispatch();
  const intl = useIntl();

  const { shareLink } = useConfig();

  if (!shareLink || !navigator.share) {
    return null;
  }

  const onClick = async () => {
    try {
      await navigator.share({
        text: intl.formatMessage(messages.text),
        title: intl.formatMessage(messages.share),
        url: shareLink,
      });
      dispatch(goBack());
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

export default ShareItem;
