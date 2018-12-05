import React from 'react'
import styled from 'styled-components'
import SquadList from './match_squad_list';

const Wrapper = styled.section`
  display:flex;
  flex:1;
  background:white;
  flex-flow: column wrap;
`

const TeamName = styled.h2`
  padding:0 0 10px;
  font-size:1em;
  border-bottom:1px solid #e0e0e0;
  display:block;
  font-size:1.1em;
  font-family:'AvenirD';
  text-transform: uppercase;
`

const Squad = props => {
  return (
    <Wrapper>
      <TeamName>{ props.team }</TeamName>
      <SquadList data={props.squad} />
    </Wrapper>
  )
}

export default Squad;
