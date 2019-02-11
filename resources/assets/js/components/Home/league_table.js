import React from 'react';
import styled from 'styled-components';
import LeagueTableItem from './league_table_item';

const FixturesTable = styled.div`
  width:100%;
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
  font-family: monospace;
  font-size:16px;
  color:#1e1e1e;
  flex-flow:column nowrap;
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

const LeagueItem = styled.div`
  background: #00529f;
  display:flex;
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
  color:#fff;
  flex:.5;
  &:nth-child(2) {
    flex:3;
    text-align:left;
  }
`

const LeagueTable = props => {
  const { leagueTable } = props;

  return (
    <FixturesTable>
      <Table>
      <LeagueItem>
        <ItemField title='Pozycja'>R</ItemField>
        <ItemField title='Klub'>Klub</ItemField>
        <ItemField title='Rozegrane mecze'>P</ItemField>
        <ItemField title='Wygrane'>W</ItemField>
        <ItemField title='Remisy'>D</ItemField>
        <ItemField title='Porażki'>L</ItemField>
        <ItemField title='Punkty'>Pts</ItemField>
      </LeagueItem>
        { leagueTable ? leagueTable.map((item, key) => {
          return <LeagueTableItem leagueTable = { item } key={ key } />
        }) : <p>No data</p> }
      </Table>
    </FixturesTable>
  )
}

export default LeagueTable;
