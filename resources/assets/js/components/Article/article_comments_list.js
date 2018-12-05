import React from 'react';
import styled from 'styled-components';
import SingleComment from './Article_comments_list_item';

const List = styled.ul`
  list-style-type: none;
  margin-top:50px;
  line-height:1.5;
`

const Comments = props => {
  return (
    <List>
      <SingleComment />
      <SingleComment />
      <SingleComment />
    </List>
  )
}

export default Comments;
