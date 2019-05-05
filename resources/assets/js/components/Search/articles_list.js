import React from 'react';
import styled from 'styled-components';
import Title from '../Schedule/schedule_title';
import createLink from '../../helpers/createLink';
import { Link } from 'react-router-dom';

const List = styled.div`
  margin-top:10px;
`

const LinkTo = styled(Link)`
  display:inline-block;
  padding:6px;
  color:#1e1e1e;
  &:hover {
    color:#FEBE10;
    cursor:pointer;
  }
`

const ArticlesList = props => {
  const { articles } = props;

  return (
    <List>
      {
        articles.length ?
        (
          articles.map((item, key) => {
            const link = createLink(item);

              return (
                <article key={item.idarticle}>
                  <LinkTo to={link}>{ item.title }</LinkTo>
                </article>
              )
            })
        ) : (
          ''
        )
      }
    </List>
  )
}

export default ArticlesList;
