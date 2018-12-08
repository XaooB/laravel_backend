import React from 'react';
import styled from 'styled-components';
import RelatedList from './article_related_list';

const Section = styled.section`
  margin-top:50px;
  margin-bottom:30px;
`

const Title = styled.h3`
  font-family:'SSPB';
  font-size:1.4em;
  margin-bottom:12px;
`

const Related = props => {
  const {neighbours} = props;
  return (
    <Section>
      <Title>Related articles</Title>
      <RelatedList neighbours = {neighbours} />
    </Section>
  )
}

export default Related;
