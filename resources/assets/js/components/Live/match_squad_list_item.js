import React from 'react'
import styled from 'styled-components'

const ListItem = styled.li`
  display:flex;
  flex-flow: row nowrap;
  align-items:center;
  margin-bottom:2px;
`

const Number = styled.div`
  display:flex;
  font-family:'DoHyeon';
  align-items:center;
  justify-content:center;
  width:40px;
  margin-right:10px;
  height:40px;
  border-radius:100%;
  background: #ededed;
`

const PlayerSurname = styled.span`
  text-transform:uppercase;
  display:block;
  padding-right:6px;
  font-family:'SSPB';
`

const SquadItem = props => {
  const { number, name, surname } = props.data;
  return (
    <ListItem>
      <Number>{number}</Number>
      <PlayerSurname>{surname}</PlayerSurname>
      <span>{name}</span>
    </ListItem>
  )
}

export default SquadItem;
