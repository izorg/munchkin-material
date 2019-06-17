import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { ListItemIcon } from '@material-ui/core';
import { ShareVariant } from 'mdi-material-ui';

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

const ShareItem = ({ onClick, shareLink, ...rest }) => {
  const intl = useIntl();

  return (
    <ListItem
      button
      onClick={() =>
        onClick({
          text: intl.formatMessage(messages.text),
          title: intl.formatMessage(messages.share),
          url: shareLink,
        })
      }
      {...rest}
    >
      <ListItemIcon>
        <ShareVariant />
      </ListItemIcon>
      <ListItemText primary={intl.formatMessage(messages.share)} />
    </ListItem>
  );
};

ShareItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  shareLink: PropTypes.string.isRequired,
};

export default ShareItem;
