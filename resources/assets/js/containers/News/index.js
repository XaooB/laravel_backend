import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Footer from '../../components/Reusable/footer'
import Wrapper from '../../components/Reusable/wrapper';
import MiniLoader from '../../components/Reusable/mini_loader';
import Articles  from '../../components/News/articles';
import Categories  from '../../components/News/categories';
import { Helmet } from 'react-helmet';
import { API } from '../../helpers/api';

const Main = styled.main`
  max-width: 1300px;
  color:#1e1e1e;
  padding:0 5px;
  margin:40px auto;
  padding-right:40px;
  @media (min-width: 640px) {
    padding-right:0;
  }
`

class News extends Component {
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
          <title>Wiadomości według kategorii - portal-wertykalny</title>
        </Helmet>
        <Main>
          <Wrapper>
            <Articles />
            <Categories />
          </Wrapper>
        </Main>
        <Footer />
      </Fragment>
    )
  }
}

export default News;
