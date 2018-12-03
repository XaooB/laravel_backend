import React from 'react';
import styled from 'styled-components';
import CheckMore from '../Reusable/checkMore';

const Wrapper = styled.div`
  display:flex;
  width:100%;
  height:170px;
  min-width:330px;
  flex-flow: row wrap;
  text-transform: uppercase;
  font-family:'AvenirBC';
`

const Teams = styled.div`
  display:flex;
  flex-flow:column nowrap;
  flex:5;
`

const Item = styled.div`
  display:flex;
  height: 50%;
  word-wrap: break-word;
  padding:10px 24px;
  align-items:center;
  flex-flox: column nowrap;
  background: #3f3f3f;
  line-height:1.5em;
  &:nth-child(even) {
    background: #1e1e1e;
  }
`

const TeamName = styled.div`
  font-size:1.75em;
  flex:3;
`

const Goals = styled.div`
  flex:1;
  text-align:right;
  font-size: 3.75em;
`

const Text = styled.p`
  text-align:left;
  width:100px;
  line-height:1em;
`

const Result = props => {
 const { latestResult } = props;

  return (
    <Wrapper>
      <Teams>
        <Item>
          <TeamName>{ latestResult.home_team }</TeamName>
          <Goals>{ latestResult.home_team_score }</Goals>
        </Item>
        <Item>
          <TeamName>{ latestResult.away_team }</TeamName>
          <Goals>{ latestResult.away_team_score }</Goals>
        </Item>
      </Teams>
        <CheckMore to='details'>
          <Text>check details</Text>
        </CheckMore>
    </Wrapper>
  )
}

export default Result;
