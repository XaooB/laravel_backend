import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Footer from '../../components/Reusable/footer'
import Club from '../../components/RealMadrid/club';
import Fixtures from '../../components/RealMadrid/fixtures';
import History from '../../components/RealMadrid/history';
import MiniLoader from '../../components/Reusable/mini_loader';
import { Helmet } from 'react-helmet';
import { API } from '../../helpers/api';

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

class RealMadrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    }
  }

  componentDiDMount() {

  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Real Madrid - portal-wertykalny</title>
        </Helmet>
        <Main>
          <Club />
          <Fixtures />
          <History />
        </Main>
        <Footer />
      </Fragment>
    )
  }
}

export default RealMadrid;
