import React from 'react'
import styled from 'styled-components'
import SquadItem from './match_squad_list_item';

const List = styled.ul`
  list-style-type: none;
  margin-top:15px;
`

const SquadList = props => {
  return (
    <List>
      {
        props.data.map((item, key) => <SquadItem key={item.number} data={item} />)
      }
    </List>
  )
}

export default SquadList;
