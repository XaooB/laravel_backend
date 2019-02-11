import React from 'react';
import styled from 'styled-components';
import dateConverter from '../../helpers/dateConverter';

const Wrapper = styled.div`
  flex:.6 1 400px;
`

const Header = styled.header`
  padding:15px;
  color:#fff;
  background: #00529f;
`

const Category = styled.p`
  text-transform: uppercase;
  font-size:.9em;
`

const Title = styled.h4`
  font-family: 'SSPB';
  font-size: 1.4em;
`

const Content = styled.div`
  display:flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top:30px;
  color:#1e1e1e;
`

const Injuries = props => {
  const { injuriesData } = props;

  return (
    <Wrapper>
      <Header>
        <Title>Injuries and suspensions</Title>
      </Header>
      <Content>
      {injuriesData.map((item, key) => {
        const {player, type, return_date} = item;

        return <div key={key} style={{marginBottom:10}}>
            <p>Name: {player.name}</p>
            <p>Type: {type}</p>
            <p>Possible return date: {dateConverter.toDateOnly(new Date(return_date))}</p>
          </div>
      })}
      </Content>
    </Wrapper>
  )
}

export default Injuries;
