import React from 'react';
import styled from 'styled-components';
import CheckMore from '../Reusable/checkMore';

const Wrapper = styled.div`
  display:flex;
  width:100%;
  height:170px;
  min-width:265px;
  flex-flow: row wrap;
  text-transform: uppercase;
  font-family:'Bebas';
`

const Teams = styled.div`
  display:flex;
  flex-flow:column nowrap;
  flex:7;
`

const Item = styled.div`
  display:flex;
  height: 50%;
  word-wrap: break-word;
  padding:10px 24px;
  align-items:center;
  flex-flox: column nowrap;
  background: #3f3f3f;
  line-height:1.8em;
  &:nth-child(even) {
    background: #1e1e1e;
  }
`

const TeamName = styled.div`
  font-size:2.2em;
  flex:3;
`

const Goals = styled.div`
  flex:1;
  text-align:right;
  font-size: 3.75em;
`

const IconSpan = styled.span`
  display:inline-block;
  font-family:'DoHyeon';
  font-size:1.2em;
`

const Result = props => {
 const { latestResult } = props;

  return (
    <Wrapper>
      <Teams>
        <Item>
          <TeamName>{ latestResult.home_team.short_name }</TeamName>
          <Goals>{ latestResult.home_team_score }</Goals>
        </Item>
        <Item>
          <TeamName>{ latestResult.away_team.short_name }</TeamName>
          <Goals>{ latestResult.away_team_score }</Goals>
        </Item>
      </Teams>
        <CheckMore to='details'>
          <IconSpan> >> </IconSpan>
        </CheckMore>
    </Wrapper>
  )
}

export default Result;
