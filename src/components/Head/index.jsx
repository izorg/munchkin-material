import React from 'react';
import Helmet from 'react-helmet/lib/Helmet';

const Head = () => (
  <Helmet>
    <html lang={navigator.language} />
  </Helmet>
);

export default Head;
