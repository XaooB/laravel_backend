import React from 'react';
import RelatedListItem from './article_related_list_item';
import Wrapper from '../Reusable/wrapper';

const RelatedList = props => {
  const {neighbours} = props;

  return (
    <Wrapper>
      {neighbours.reverse().map((item, key) => {
        return <RelatedListItem article={item} key={key} />
      })}
    </Wrapper>
  )
}

export default RelatedList;
