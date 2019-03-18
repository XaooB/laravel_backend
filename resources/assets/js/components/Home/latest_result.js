import React from 'react';
import PageHeader from '../Reusable/PageHeader';
import Result from './latest_result_details';
import styled from 'styled-components';

const Section = styled.section`
  flex:1;
  margin-right:20px;
`

const LatestResult = props => {
  const { latestResult } = props;

  return (
    <Section>
      <Result latestResult= { latestResult }/>
    </Section>
  )
}

export default LatestResult;
