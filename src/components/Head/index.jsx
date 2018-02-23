import React, { PureComponent } from 'react';
import Helmet from 'react-helmet/lib/Helmet';
import { withTheme } from 'material-ui/styles';

class Head extends PureComponent {
  render() {
    const { theme } = this.props;

    return (
      <Helmet>
        <html lang={navigator.language} />
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Helmet>
    );
  }
}

export default withTheme()(Head);
