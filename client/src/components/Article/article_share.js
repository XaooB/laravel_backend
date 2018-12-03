import React from 'react';
import styled from 'styled-components';

const ArticleFooter = styled.footer`
  font-family: 'socialtype';
  font-size:3em;
  line-height:0;
`

const List = styled.ul`
  list-style-type:none;
`

const ListItem = styled.li`
  display:inline-block;
  margin:0;
  height:40px;
`

const ListLink = styled.a`
  display:inline-block;
  color:#e0e0e0;
  &:hover {
    color:#00529f;
  }
`

const Share = props => {
  return (
    <ArticleFooter>
      <List>
        <ListItem>
          <ListLink href='#'><span>a</span></ListLink>
        </ListItem>
        <ListItem>
          <ListLink href='#'><span>b</span></ListLink>
        </ListItem>
        <ListItem>
          <ListLink href='#'><span>c</span></ListLink>
        </ListItem>
      </List>
    </ArticleFooter>
  )
}

export default Share;
