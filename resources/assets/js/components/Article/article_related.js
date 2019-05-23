import React from 'react';
import styled from 'styled-components';
import RelatedList from './article_related_list';

const Section = styled.section`
  margin-top:50px;
`

const Title = styled.h3`
  font-weight:lighter;
  font-size:1.4em;
  margin-bottom:16px;
`

const Related = props => {
  const {neighbours} = props;
  return (
    <Section>
      <Title>Powiązane artykuły</Title>
      <RelatedList neighbours = {neighbours} />
    </Section>
  )
}

export default Related;
