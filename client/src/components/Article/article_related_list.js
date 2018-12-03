import React from 'react';
import RleatedListItem from './article_related_list_item';
import Wrapper from '../Reusable/wrapper';

const RleatedList = props => {
  return (
    <Wrapper>
      <RleatedListItem />
      <RleatedListItem />
      <RleatedListItem />
    </Wrapper>
  )
}

export default RleatedList;
