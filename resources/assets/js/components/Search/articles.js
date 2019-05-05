import React, { Component } from 'react';
import styled from 'styled-components';
import Title from '../Schedule/schedule_title';
import ArticlesList from './articles_list';
import MiniLoader from '../Reusable/mini_loader';

const Container = styled.section`
  width:73%;
`

const Information = styled.p`
  padding:10px 0;
`

class Articles extends Component {
  render() {
    const { articles, keyword, status } = this.props;

    return (
      <Container>
        <Title>Wyniki wyszukiwania</Title>
        {
          !status ?
          articles.length ?
          (
            <ArticlesList articles={ articles } keyword={ keyword } />
          ) : (
              <Information>Brak wyników</Information>
          ) : (
            <MiniLoader margin={20} />
          )
        }
      </Container>
    )
  }
}

export default Articles;
