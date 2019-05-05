import React from 'react';
import styled from 'styled-components';
import PageHeader from '../Reusable/PageHeader'
import { connect } from 'react-redux';

const Container = styled.section`
  width:100%;
  flex:1 1 580px;
  order:2;
  @media (min-width: 820px) {
    order:1;
    width:73%;
  }
`

const Info = styled.p`
  margin-top:16px;
`


const UserActivity = props => {
  return (
    <Container>
      <PageHeader>Ostatnia aktywność</PageHeader>
      <Info>Brak aktywności w ostatnim czasie..</Info>
    </Container>
  )
}

export default UserActivity;
