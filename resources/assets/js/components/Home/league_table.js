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
  color:#1e1e1e;
  letter-spacing:1.1px;
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

const LeagueTable = props => {
  const { leagueTable } = props;

  return (
    <FixturesTable>
      <Table>
        { leagueTable ? leagueTable.map((item, key) => {
          return <LeagueTableItem leagueTable = { item } key={ key } />
        }) : <p>No data</p> }
      </Table>
    </FixturesTable>
  )
}

export default LeagueTable;
