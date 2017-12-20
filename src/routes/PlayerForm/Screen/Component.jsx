import React from 'react';

import Layout, { LayoutContent, LayoutHeader } from '../../../components/Layout';

import AppBar from './AppBar';
import Form from './Form';

const PlayerFormScreenComponent = () => (
  <Layout>
    <LayoutHeader>
      <AppBar />
    </LayoutHeader>
    <LayoutContent>
      <Form />
    </LayoutContent>
  </Layout>
);

export default PlayerFormScreenComponent;
