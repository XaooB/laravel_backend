import React from 'react';
import styled from 'styled-components';

const LeagueItem = styled.div`
  display:flex;
  flex-flow:row nowrap;
  padding:7px 3px;
  height:34px;
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
  text-align:center;
  flex:.4
  &:nth-child(2) {
    display:flex;
    flex:2;
  }
  &:nth-child(3) {
    text-align:left;
    flex:2;
  }
`

const ScorersTableItem = props => {
  const { club, position, player, goals, matches, image } = props.leagueTable;

  if(club === 'Real Madrid') return (
    <LeagueItem style={{border:'1px solid #FEBE10'}}>
      <ItemField>{ position }</ItemField>
      <ItemField>
        <ImageWraper>
          <Image src={ image } title={ player } alt={ player } />
        </ImageWraper>
          { club }
      </ItemField>
      <ItemField>{ player }</ItemField>
      <ItemField>{ goals }</ItemField>
      <ItemField>{ matches }</ItemField>
    </LeagueItem>
  )

  return (
    <LeagueItem>
      <ItemField>{ position }</ItemField>
      <ItemField>
        <ImageWraper>
          <Image src={ image } title={ player } alt={ player } />
        </ImageWraper>
          { club }
      </ItemField>
      <ItemField>{ player }</ItemField>
      <ItemField>{ goals }</ItemField>
      <ItemField>{ matches }</ItemField>
    </LeagueItem>
  )
}

export default ScorersTableItem;
