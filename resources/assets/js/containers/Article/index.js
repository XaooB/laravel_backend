import React, { Component } from 'react';
import styled from 'styled-components';
import Article from '../../components/Article/article';
import Aside from '../../components/Article/article_aside';
import ArticleImage from '../../components/Article/article_image';

const Main = styled.main`
  display:flex;
  flex-flow:column;
  position:relative;
  color:#1e1e1e;
  top:-130px;
  width:100%;
`

const Container = styled.section`
  display:flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top:40px;
  padding:0 5px;
`

class SingleArticle extends Component {
  render() {
    return (
      <Main>
        <ArticleImage />
        <Container>
          <Article />
          <Aside>
            <p>miejsce na reklamemiejsce na reklamemiejsce na reklamemiejsce na reklame</p>
          </Aside>
        </Container>
      </Main>
    )
  }
}

export default SingleArticle;
