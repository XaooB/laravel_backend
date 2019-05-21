import React from 'react';
import styled from 'styled-components';
import Author from './article_author'
import CommentFeatures from './article_comments_features'
import Content from './article_content';
import CommentSection from './article_comments';
import Related from './article_related';
import ArticleHeader from './article_header';
import { connect } from 'react-redux';

const ArticleWrapper = styled.article`
  display:flex;
  flex-flow:column wrap;
  background:white;
  flex: 3;
  section:last-child section {
    padding:0;
  }
`;

const Section = styled.section`
  display:flex;
  justify-content: space-between;
  flex-flow: row wrap;
`

const Wrapper = styled.section`
  flex:6;
  margin-top:20px;
  background:white;
  padding:0 5px;
  @media (min-width: 480px) {
    padding:0 25px;
    margin-top:0;
  }
`

const Article = props => {
  const {article, neighbours, user, url} = props;

  return (
    <ArticleWrapper>
      <Section>
        <Author article = {article} url={url} />
        <Wrapper>
          <ArticleHeader article = {article} />
          <Content article = {article} />
          <Related neighbours = {neighbours} />
        </Wrapper>
      </Section>
      <Section>
        <Wrapper>
          <CommentSection articleID={article.idarticle} user={user} />
        </Wrapper>
      </Section>
    </ArticleWrapper>
  )
}

function mapStateToPorps(state) {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToPorps)(Article);
