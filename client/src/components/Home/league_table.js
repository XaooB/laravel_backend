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
  font-size:.9em;
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

const LeagueTable = props => {
  const { leagueTable } = props;

  return (
    <FixturesTable>
      <Container>
        <Image src='./assets/images/laliga_logo.png' title='la liga' alt='la liga' />
        <Selection>
          <option>La Liga</option>
          <option>champion league</option>
          <option>copa del ray</option>
        </Selection>
      </Container>
      <Table>
        { leagueTable ? leagueTable.map((item, key) => {
          return <LeagueTableItem leagueTable = { item } key={ key } />
        }) : <p>No data</p> }
      </Table>
    </FixturesTable>
  )
}

export default LeagueTable;
