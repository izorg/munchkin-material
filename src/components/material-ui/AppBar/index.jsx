import React from 'react';
import AppBar from 'material-ui/AppBar';

import { ios } from '../../../helpers/platforms';

const platformTitleStyle = {
  fontSize: 20,
};

if (ios) {
  Object.assign(platformTitleStyle, {
    textAlign: 'center',
  });
}

// eslint-disable-next-line react/prop-types
export default ({ titleStyle = {}, ...props }) => (
  <AppBar
    {...props}
    titleStyle={{
      ...platformTitleStyle,
      ...titleStyle,
    }}
  />
);
