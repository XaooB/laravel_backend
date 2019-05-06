import React from 'react';
import styled from 'styled-components';
import Title from './admin_content_title';
import ArticleFilters from './article_filters';
import ArticleTable from './article_table';

const Container = styled.section`
  margin-left:1px;
  margin:20px;
  margin-top:5px;
  align-items:center;
  svg {
    color:#c6c6c6;
    font-size:1.25em;
    font-family: 'SSPL';
  }
`

const Wrapper = styled.section`
  background:#fff;
  padding:15px 20px;
  margin:1px 20px;
`

const CommentsContent = props => {
  return (
    <Container>
      <Title>Komentarze użytkowników</Title>
      <Wrapper>
        <ArticleFilters />
      </Wrapper>
      <Wrapper>
        <ArticleTable />
      </Wrapper>
    </Container>
  );
};

export default CommentsContent;
