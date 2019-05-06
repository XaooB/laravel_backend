import React from 'react';
import styled from 'styled-components';
import PageHeader from '../Reusable/PageHeader'
import { connect } from 'react-redux';
import FixtureType from './fixture_type'

const Wrapper = styled.div`
  display:flex;
  flex-flow:row wrap;
  justify-content:center;
  margin:20px 0;
`

const Container = styled.section`
  margin-top:20px;
`

const ChooseFixture = props => {
  const { schedule } = props.user;

  return (
    <Container>
      <PageHeader>Wybierz rozgrywki</PageHeader>
      <Wrapper>
        <FixtureType logo='All.png' type='All' name='Wszystkie' checked={ 'All' === schedule.filterType ? true : false } />
        <FixtureType logo='laliga.png' type='Primera Division' name='Liga hiszpańska' checked={ 'Primera Division' === schedule.filterType ? true : false } />
        <FixtureType logo='cpr.png' type='Copa Del Rey' name='Puchar króla' checked={ 'Copa Del Rey' === schedule.filterType ? true : false } />
        <FixtureType logo='uefa.png' type='UEFA Champions League' name='Liga mistrzów' checked={ 'UEFA Champions League' === schedule.filterType ? true : false } />
      </Wrapper>
    </Container>
  )
}

const mapStateToProps = ({user}) => ({user});
export default connect(mapStateToProps)(ChooseFixture);
