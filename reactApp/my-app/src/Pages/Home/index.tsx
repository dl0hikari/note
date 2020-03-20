import React, { Fragment } from 'react';
import Navigation from './Navigation';
import Header from './Header';
import GlobalStyle from '../../Components/GlobalStyle';

export default function Home() {

  return (
    <Fragment>
        <GlobalStyle />
        <Header/>
        <Navigation />
    </Fragment>
  );
}
