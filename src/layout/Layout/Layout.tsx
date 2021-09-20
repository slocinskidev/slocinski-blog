import React, { FC } from 'react';
import { BaseComponentProps } from 'types';
import Footer from 'containers/Footer';
import Header from 'containers/Header';

import 'normalize.css';

import './Layout.scss';

const Layout: FC<BaseComponentProps> = ({ children }) => (
  <>
    <Header />
    <main className="main">{children}</main>
    <Footer />
  </>
);

export default Layout;
