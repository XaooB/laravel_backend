import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dateConverter from '../../helpers/dateConverter';
import Share from './article_share';

const Wrapper = styled.section`
  flex:1;
  padding-top:5px;
  margin-bottom:10px;
  @media only screen and (max-width: 480px) {
    display:none;
  }
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
  line-height:1.1;
  display:inline-block;
  text-transform: uppercase;
  font-family:'SSPB';
  border-bottom:1px solid #e0e0e0;
  padding:0 0 12px 20px;
  &:hover {
    text-decoration:underline;
  }
`

const LinkToUser = styled(Link)`
  color:#00529f;
  display:inline;
  text-transform: lowercase;
`

const Author = props => {
  const { category, user, create_date } = props.article;

  return (
    <Wrapper>
      <Sticky>
        <LinkTo to={`/app/news/${category}`}>{category}</LinkTo>
        <PublishedBy>dodane przez <LinkToUser to={`/app/user/${user.iduser}`} title={`Profil użytkownika ${user.name}`}>{user.name}</LinkToUser>,<br/>{dateConverter.toStageDate(create_date)}</PublishedBy>
        <Share url={props.url} />
      </Sticky>
    </Wrapper>
  )
}

export default Author;
