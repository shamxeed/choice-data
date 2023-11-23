'use client';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, noHeader }) => {
  return (
    <>
      {!noHeader && <Header />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
