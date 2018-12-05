import React from 'react';
import styled from 'styled-components';

const LeagueItem = styled.div`
  display:flex;
  flex-flow:row nowrap;
  padding:8px 4px;
  align-items:center;
  margin:2px 0;
  justify-content:space-between;
  flex:1 1 50%;
  text-transform: uppercase;
`

const ItemField = styled.div`
  flex:1;
  text-align:right;
  &:first-child {
    text-align:left;
    flex:3;
  }
`

const LeagueTableItem = props => {
  const { club, draw, lost, matches, points, won } = props.leagueTable;

  if(club.short_name === 'Real Madrid') return (
    <LeagueItem style={{background: '#00529f', color:'white'}}>
      <ItemField>{ club.short_name }</ItemField>
      <ItemField>{ matches }</ItemField>
      <ItemField>{ won }</ItemField>
      <ItemField>{ draw }</ItemField>
      <ItemField>{ lost }</ItemField>
      <ItemField>{ points }</ItemField>
    </LeagueItem>
  )

  return (
    <LeagueItem>
      <ItemField>{ club.short_name }</ItemField>
      <ItemField>{ matches }</ItemField>
      <ItemField>{ won }</ItemField>
      <ItemField>{ draw }</ItemField>
      <ItemField>{ lost }</ItemField>
      <ItemField>{ points }</ItemField>
    </LeagueItem>
  )
}

export default LeagueTableItem;
