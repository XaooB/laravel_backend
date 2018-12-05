import React from 'react';
import styled from 'styled-components';
import { dateConverter } from '../../helpers/dateConverter';

const Wrapper = styled.div`
  flex:.6 1 400px;
`

const Header = styled.header`
  background: #ee324e;
  padding:20px;
`

const Category = styled.p`
  text-transform: uppercase;
  font-size:.9em;
`

const Title = styled.h4`
  margin-top:10px;
  font-family: 'AvenirD';
  font-size: 1.375em;
`

const Injuries = props => {
  const { injuriesData } = props;

  return (
    <Wrapper>
      <Header>
        <Category>injuries</Category>
        <Title>Currently there is not any player with injury</Title>
      </Header>
      {injuriesData.map((item, key) => {
        const {player, type, return_date} = item;
        return <div style={{color:'#1e1e1e'}} key={key}>
            <p>Name: {player.name}</p>
            <p>Type: {type}</p>
            <p>Possible return date: {dateConverter.toDateOnly(new Date(return_date))}</p>
          </div>
      })}
    </Wrapper>
  )
}

export default Injuries;
