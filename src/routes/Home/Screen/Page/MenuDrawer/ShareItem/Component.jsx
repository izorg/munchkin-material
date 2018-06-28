import React from 'react';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Share from '@material-ui/icons/Share';

const supports = 'share' in navigator;

const messages = defineMessages({
  text: {
    id: 'share.text',
    defaultMessage: 'Simple but powerful Munchkin level counter',
  },

  title: {
    id: 'share.title',
    defaultMessage: 'Munchkin Level Counter',
  },
});

const ShareItem = ({ intl, onClick, shareLink, ...rest }) =>
  supports &&
  shareLink && (
    <ListItem
      button
      onClick={() =>
        onClick({
          text: intl.formatMessage(messages.text),
          title: intl.formatMessage(messages.title),
          url: shareLink,
        })
      }
      {...rest}
    >
      <ListItemIcon>
        <Share />
      </ListItemIcon>
      <ListItemText
        primary={<FormattedMessage id="menu.share" defaultMessage="Share" />}
      />
    </ListItem>
  );

ShareItem.propTypes = {
  intl: intlShape.isRequired,
  shareLink: PropTypes.string,
};

ShareItem.defaultProps = {
  shareLink: null,
};

export default injectIntl(ShareItem);
