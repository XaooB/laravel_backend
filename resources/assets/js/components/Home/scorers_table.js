import React from 'react';
import styled from 'styled-components';
import ScorersTableItem from './scorers_table_item';
import Button from '../Reusable/button';

const FixturesTable = styled.div`
  flex:1 1 350px;
  margin:10px;
`

const Container = styled.div`
  display:flex;
  flex-flow: row wrap;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
`

const Table = styled.div`
  display:flex;
  font-family:'AvenirLTR';
  color:#1e1e1e;
  flex-flow:row wrap;
`

const Image = styled.img`
  height:50px;
`

const Selection = styled.select`
  padding:6px;
  max-width:150px;
  font-size:.875em;
  text-transform:uppercase;
  color: #00529f;
  border:1px solid #00529f;
`

const Title = styled.div`
  background: #ededed;
  display:flex;
  font-family:"AvenirLTD";
  font-size:.9em;
  color:#777;
  border-radius:6px;
  padding:8px 4px;
  margin:2px 0;
  flex:1 1 100%;
  justify-content:space-between;
  text-transform: uppercase;
  font-weight:bold;
`

const ItemField = styled.div`
  display:block;
  cursor:default;
  text-align:center;
  flex:.4
  &:nth-child(2) {
    flex:initial;
    margin-right:20px;
    text-align:left;
    @media (min-width: 480px) {
      flex:2;
      margin-right:0;
    }
  }
  &:nth-child(3) {
    flex:2;
    text-align:left;
  }
`

const ButtonWrapper = styled.div`
  display:flex;
  margin-top:12px;
`

const scorers = [
  {
    position: 1,
    player: 'Lionel Messi',
    club: 'FC Barcelona',
    image: 'http://upload.wikimedia.org/wikipedia/de/a/aa/Fc_barcelona.svg',
    goals: '25',
    matches: '23'
  },
  {
    position: 2,
    player: 'Luis Suarez',
    club: 'FC Barcelona',
    image: 'http://upload.wikimedia.org/wikipedia/de/a/aa/Fc_barcelona.svg',
    goals: '16',
    matches: '24'
  },
  {
    position: 3,
    player: 'Cristhian Stuani',
    club: 'Girona FC',
    image: 'http://upload.wikimedia.org/wikipedia/de/3/3f/Real_Madrid_Logo.svg',
    goals: '13',
    matches: '22'
  },
  {
    position: 4,
    player: 'Charles',
    club: 'SD Eibar',
    image: 'http://upload.wikimedia.org/wikipedia/de/3/3f/Real_Madrid_Logo.svg',
    goals: '12',
    matches: '22'
  },
  {
    position: 5,
    player: 'Antoine Griezmann',
    club: 'SD Eibar',
    image: 'http://upload.wikimedia.org/wikipedia/de/c/c1/Atletico_Madrid_logo.svg',
    goals: '12',
    matches: '25'
  },
  {
    position: 6,
    player: 'Karim Benzema',
    club: 'Real Madrid',
    image: 'http://upload.wikimedia.org/wikipedia/de/3/3f/Real_Madrid_Logo.svg',
    goals: '11',
    matches: '22'
  },
]

const ScorersTable = props => {

  return (
    <FixturesTable>
      <Table>
        <Title>
          <ItemField title='Pozycja'>Lp.</ItemField>
          <ItemField title='Klub'>Klub</ItemField>
          <ItemField title='Zawodnik'>Zawodnik</ItemField>
          <ItemField title='Gole'>G</ItemField>
          <ItemField title='Mecze'>M</ItemField>
        </Title>
        {
          scorers ? scorers.map((item, key) => {
            return key < 6 ? <ScorersTableItem leagueTable = { item } key={ key } /> : false;
          }) : <p>No data</p>
        }
      </Table>
      <ButtonWrapper>
        <Button colorBlue fullWidth name='Pokaż całą tabelę'></Button>
      </ButtonWrapper>
    </FixturesTable>
  )
}

export default ScorersTable;
