import React from 'react';
import styled from 'styled-components';
import { GoCommentDiscussion, GoHeart } from 'react-icons/go';

const Header = styled.header`
  background:white;
  color:#1e1e1e;
  margin-bottom:40px;
`

const Title = styled.h2`
  display:block;
  font-family:'SSPBK';
  font-size:2.6em;
`

const Wrapper = styled.div`
  margin-top:15px;
  display:flex;
  justify-content:flex-start;
  flex-flow: row nowrap;
`

const Item = styled.div`
  display:flex;
  align-items:center;
  &:not(:last-child) {
    margin-right:6px;
  }
  svg {
    color:#00529f;
  }
`

const Count = styled.span`
  display:inline-block;
  margin-left:4px;
  font-size:.95em;
`

const ArticleTitle = props => {
  const { title, likes_count, comments_count } = props.article;
  return (
    <Header>
      <Title>{title}</Title>
      <Wrapper>
        <Item>
          <GoCommentDiscussion />
          <Count>{comments_count}</Count>
        </Item>
        <Item>
          <GoHeart />
          <Count>{likes_count}</Count>
        </Item>
      </Wrapper>
    </Header>
  )
}

export default ArticleTitle;
