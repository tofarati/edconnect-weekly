import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Container} from 'react-bootstrap';

const Layout = ({children, passLoginStatus}) => {

  return (
    <>
      <Header passLoginStatus={passLoginStatus}/>
        <Container fluid className="p-5">{children}</Container>
      <Footer/>
    </>
  );
}

export default Layout;
