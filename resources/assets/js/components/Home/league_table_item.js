import React from 'react';
import styled from 'styled-components';

const LeagueItem = styled.div`
  display:flex;
  flex-flow:row nowrap;
  padding:7px 3px;
  height:34px;
  align-items:center;
  margin:2px 0;
  justify-content:space-between;
  flex:1 1 100%;
`

const Image = styled.img`
  height:18px;
`

const ImageWraper = styled.figure`
  display:flex;
  justify-content:center;
  margin-right:8px;
  height:20px;
  width:20px;
  overflow:hidden;
`

const ItemField = styled.div`
  flex:.5;
  &:nth-child(2) {
    display:flex;
    flex:3;
    text-align:left;
  }
`

const LeagueTableItem = props => {
  const { club, draw, lost, matches, points, won, position } = props.leagueTable;

  if(club.short_name === 'Real Madrid') return (
    <LeagueItem style={{border:'1px solid #FEBE10'}}>
      <ItemField>{ position }</ItemField>
      <ItemField>
        <ImageWraper>
          <Image src={ club.image } title={ club.short_name } alt={ club.short_name } />
        </ImageWraper>
          { club.short_name }
      </ItemField>
      <ItemField>{ matches }</ItemField>
      <ItemField>{ won }</ItemField>
      <ItemField>{ draw }</ItemField>
      <ItemField>{ lost }</ItemField>
      <ItemField>{ points }</ItemField>
    </LeagueItem>
  )

  return (
    <LeagueItem>
      <ItemField>{ position }</ItemField>
      <ItemField>
        <ImageWraper>
          <Image src={ club.image } title={ club.short_name } alt={ club.short_name } />
        </ImageWraper>
          { club.short_name }
      </ItemField>
      <ItemField>{ matches }</ItemField>
      <ItemField>{ won }</ItemField>
      <ItemField>{ draw }</ItemField>
      <ItemField>{ lost }</ItemField>
      <ItemField>{ points }</ItemField>
    </LeagueItem>
  )
}

export default LeagueTableItem;
