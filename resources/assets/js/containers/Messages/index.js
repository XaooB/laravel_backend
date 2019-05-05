import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Footer from '../../components/Reusable/footer';
import PageHeader from '../../components/Reusable/PageHeader'
import { Helmet } from 'react-helmet';

const Main = styled.main`
  max-width: 1300px;
  color:#1e1e1e;
  padding:0 5px;
  margin:40px auto;
  padding-right:45px;
  @media (min-width: 640px) {
    padding-right:0;
  }
`

const Info = styled.p`
  margin-top:16px;
`

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Twoje wiadomości - portal-wertykalny.herokuapp.com</title>
        </Helmet>
        <Main>
          <PageHeader>Wiadomości</PageHeader>
          <Info>tutaj pojawią się twoje wiadomosci</Info>
        </Main>
        <Footer />
      </Fragment>
    )
  }
}

export default Messages;
