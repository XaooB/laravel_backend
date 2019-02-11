import React from 'react';
import styled from 'styled-components';
import ListItem from './poll_list_item';

const List = styled.ul`
  list-style-type: none;
  margin-bottom:25px;
`

const PollList = props => <List> { props.pollData.answers.map(( item, key ) => {
      return <ListItem key={key} data={ item } /> }) }
</List>

export default PollList;
