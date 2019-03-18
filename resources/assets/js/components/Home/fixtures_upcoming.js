import React from 'react';
import PageHeader from '../Reusable/PageHeader';
import ScheduleTable from './fixtures_upcoming_table';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  flex:1;
  color:#1e1e1e;
  font-weight:lighter;
  padding:4px 0;
  font-size:1.05em;
`

const Wrapper = styled.div`
  height:170px;
  min-width:320px;
`

const LinkTo = styled(Link)`
  color: #00529f;
  width:100%;
  display:block;
  text-align:center;

`

const IconSpan = styled.span`
  display:inline-block;
  font-family:'Bebas';
  font-size:1.2em;
`

const FixturesUpcoming = props => {
  const { schedule } = props;
  return (
    <Section>


        <ScheduleTable schedule = { schedule }/>

    </Section>
  )
}

export default FixturesUpcoming;
