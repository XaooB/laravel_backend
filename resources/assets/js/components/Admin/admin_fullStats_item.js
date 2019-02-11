import React from 'react';
import styled from 'styled-components';
import { FaUsers } from 'react-icons/fa';

const Wrapper = styled.div`
  margin: 10px 20px 20px 20px;
  background:#fff;
  border-radius:3px;
  padding:20px;
  display:flex;
  justify-content:space-between;
  align-self:flex-start;
  flex:1;
  div + svg {
    font-size:2.2em;
  }
`

const Amount = styled.span`
  font-family:'SSP';
  display:block;
  font-size:2.75em;
`

const Title = styled.span`
  font-size:.8em;
  letter-spacing:.5px;
  color:#777777;
  display:block;
  text-transform: uppercase;
`

const FullStatsItem = (props) => {
  return (
    <Wrapper>
      <div>
        <Amount>{props.amount}</Amount>
        <Title>{props.name}</Title>
      </div>
      <FaUsers />
    </Wrapper>
  )
}

export default FullStatsItem;
