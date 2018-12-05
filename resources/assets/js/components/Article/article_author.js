import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Share from './article_share';

const Wrapper = styled.section`
  flex:1;
  padding-top:5px;
  margin-bottom:330px;
`

const Sticky = styled.div`
 position: sticky;
 top:42%;
 text-align: right;
 line-height:1.5;
`

const PublishedBy = styled.span`
  display:block;
  margin-top:15px;
`

const LinkTo = styled(Link)`
  color:#00529f;
  display:inline-block;
  font-family:'AvenirD';
  border-bottom:1px solid #e0e0e0;
  padding:0 0 12px 20px;
  &:hover {
    text-decoration:underline;
  }
`

const Author = props => {
  return (
    <Wrapper>
      <Sticky>
        <LinkTo to='/club'>CLUB</LinkTo>
        <PublishedBy>posted by xaoo, <br/> 3 hours ago</PublishedBy>
        <Share />
      </Sticky>
    </Wrapper>
  )
}

export default Author;
