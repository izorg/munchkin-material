import React from 'react';
import { Helmet } from 'react-helmet';

const Head = () => (
  <Helmet>
    <html lang={navigator.language} />
  </Helmet>
);

export default Head;
