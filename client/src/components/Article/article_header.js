import React from 'react';
import styled from 'styled-components';
import { GoCommentDiscussion, GoHeart } from 'react-icons/go';

const Header = styled.header`
  background:white;
  color:#1e1e1e;
  margin-bottom:50px;
`

const Title = styled.h2`
  display:block;
  font-family:'AvenirB';
  font-size:2.5em;
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
    margin-right:15px;
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
  return (
    <Header>
      <Title>Vinicius Jr. plays his first match in Real Madrid</Title>
      <Wrapper>
        <Item>
          <GoCommentDiscussion />
          <Count>158 comments</Count>
        </Item>
        <Item>
          <GoHeart />
          <Count>72 likes</Count>
        </Item>
      </Wrapper>
    </Header>
  )
}

export default ArticleTitle;
