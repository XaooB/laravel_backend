import React from 'react';
import PageHeader from '../Reusable/PageHeader';
import ScheduleTable from './fixtures_upcoming_table';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  flex:1;
`

const Wrapper = styled.div`
  display:flex;
  height:170px;
  min-width:330px;
  flex-flow:row wrap;
`

const LinkTo = styled(Link)`
  background: #00529f;
  width:100%;
  display:block;
  text-align:center;
  align-self:flex-end;
  padding:2px;
`

const IconSpan = styled.span`
  transform: rotate(90deg);
  display:inline-block;
  font-family:'DoHyeon';
  font-size:1.2em;
`

const FixturesUpcoming = props => {
  const { schedule } = props;
  return (
    <Section>
      <PageHeader title='Teminarz' />
      <Wrapper>
        <ScheduleTable schedule = { schedule }/>
        <LinkTo to='/schedule'>
          <IconSpan> >> </IconSpan>
        </LinkTo>
      </Wrapper>
    </Section>
  )
}

export default FixturesUpcoming;
