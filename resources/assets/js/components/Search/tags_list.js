import React from 'react';
import styled from 'styled-components';
import Title from '../Schedule/schedule_title';
import { Link } from 'react-router-dom';

const List = styled.div`
  margin-top:10px;
`

const LinkTo = styled(Link)`
  display:inline-block;
  padding:8px;
  font-size:.95em;
  margin:2px;
  line-height:1;
  background:#00529f;
  color:#fff;
  border-radius:6px;
  &:hover {
    color:#FEBE10;
    cursor:pointer;
  }
`

const TagsList = props => {
  const { articles } = props;

  return (
    <List>
      {
        articles.length ?
        (
          articles[0]
            .title.split(' ')
            .map((item, key) => {
              const tag = item.toLowerCase();
              return <LinkTo to={`/app/search/${tag}`} key={key}>{tag}</LinkTo>
            })
        ) : (
          ''
        )
      }
    </List>
  )
}

export default TagsList;
