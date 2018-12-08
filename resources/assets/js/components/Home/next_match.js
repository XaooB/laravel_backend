import React from 'react';
import styled from 'styled-components';
import NextMatchItem from './next_match_item'
import PageHeader from '../Reusable/PageHeader';

const Section = styled.section`
  flex:1;
  margin-right:20px;
`

const NextMatch = props => {
  return (
    <Section>
      <PageHeader title='Następny' />
      <NextMatchItem data={props.nextMatch} />
    </Section>
  )
}

export default NextMatch;
