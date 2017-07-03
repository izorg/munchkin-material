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
export default ({ titleStyle = {}, ...rest }) => {
  const props = Object.assign({}, rest);

  if (ios) {
    Object.assign(props, {
      zDepth: 0,
    });
  }

  return (
    <AppBar
      {...props}
      titleStyle={{
        ...platformTitleStyle,
        ...titleStyle,
      }}
    />
  );
};
