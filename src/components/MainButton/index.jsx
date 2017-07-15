import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import FabTransition from './FabTransition';

import { noop } from '../../constants';

import cn from './style.css';

const messages = defineMessages({
  label: {
    id: 'mainButton.label',
    defaultMessage: 'Add a new munchkin',
  },
});

const AddButton = ({ className, intl, onClick }) => (
  <TransitionGroup className={className}>
    <FabTransition>
      <div className={cn.fab}>
        <FloatingActionButton
          aria-label={intl.formatMessage(messages.label)}
          onClick={onClick}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    </FabTransition>
  </TransitionGroup>
);

AddButton.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
  onClick: PropTypes.func,
};

AddButton.defaultProps = {
  className: '',
  onClick: noop,
};

export default injectIntl(AddButton);
