import React from 'react';
import styled from 'styled-components';
import InjuriesListItem from './injuries_list_item';
import dateConverter from '../../helpers/dateConverter';

const Wrapper = styled.div`
  flex:1 1 300px;
`

const Category = styled.p`
  text-transform: uppercase;
  font-size:.9em;
`

const Header = styled.header`
  padding:8px 4px;
  font-size:.9em;
  border-radius: 6px;
  color:#777;
  background: #ededed;
`

const Title = styled.h4`
  font-family: 'AvenirLTD';
  padding:0 5px;
  text-transform: uppercase;
`

const Content = styled.div`
  display:flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top:18px;
  color:#1e1e1e;
`

const Injuries = props => {
  const { injuriesData } = props;

  return (
    <Wrapper>
      <Header>
        <Title>Kontuzje i zawieszenia</Title>
      </Header>
      <Content>
        {
          injuriesData.map((item, key) => {
            return <InjuriesListItem key={item.player.id_player} data={item} />
          })
        }
      </Content>
    </Wrapper>
  )
}

export default Injuries;
