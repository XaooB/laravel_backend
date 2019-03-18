import React from 'react';
import styled from 'styled-components';
import LeagueTableItem from './league_table_item';
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
  text-align:center;
  flex:1 1 75%;
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
  flex-flow:row nowrap;
  padding:8px 4px;
  align-items:center;
  margin:2px 0;
  justify-content:space-between;
  flex:1 1 50%;
  text-transform: uppercase;
  font-weight:bold;
`

const ItemField = styled.div`
  cursor:default;
  flex:.5;
  &:nth-child(2) {
    text-align:left;
    flex:3;
  }
`

const ButtonWrapper = styled.div`
  display:flex;
  margin-top:12px;
`

const LeagueTable = props => {
  const { leagueTable } = props;

  return (
    <FixturesTable>
      <Table>
        <Title>
          <ItemField title='Pozycja'>Lp.</ItemField>
          <ItemField title='Klub'>Klub</ItemField>
          <ItemField title='Rozegrane mecze'>P</ItemField>
          <ItemField title='Wygrane'>W</ItemField>
          <ItemField title='Remisy'>D</ItemField>
          <ItemField title='Porażki'>L</ItemField>
          <ItemField title='Punkty'>Pts</ItemField>
        </Title>
        {
          leagueTable ? leagueTable.map((item, key) => {
            return key < 6 ? <LeagueTableItem leagueTable = { item } key={ key } /> : false;
          }) : <p>No data</p>
        }
      </Table>
      <ButtonWrapper>
        <Button colorBlue fullWidth name='Pokaż całą tabelę'></Button>
      </ButtonWrapper>
    </FixturesTable>
  )
}

export default LeagueTable;
