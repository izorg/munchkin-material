import React from 'react';
import AppBar from 'material-ui/AppBar';

// eslint-disable-next-line react/prop-types
export default ({ titleStyle = {}, ...props }) => (
  <AppBar
    {...props}
    titleStyle={{
      fontSize: 20,
      ...titleStyle,
    }}
  />
);
