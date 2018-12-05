import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  font-family: 'DoHyeon';
  font-size: 1em;
  text-transform: uppercase;
`

const List = styled.ul`
  list-style:none;
`

const ListLink = styled(Link)`
  color:white;
  &:hover {
    color:#febe10;
  }
`

const ListItem = styled.li`
  display:inline-block;
  padding:0 15px;
  letter-spacing:1.2px;
`


const Navigation = () => {
  return (
    <Nav>
      <List>
        <ListLink to='/news'>
          <ListItem>news</ListItem>
        </ListLink>
        <ListLink to='/club'>
          <ListItem>club</ListItem>
        </ListLink>
        <ListLink to='/schedule'>
          <ListItem>schedule</ListItem>
        </ListLink>
        <ListLink to='/live'>
          <ListItem>Live</ListItem>
        </ListLink>
        <ListLink to='/contact'>
          <ListItem>contact us</ListItem>
        </ListLink>
        <ListLink to='/join'>
          <ListItem>join us</ListItem>
        </ListLink>
      </List>
    </Nav>
  )
}

export default Navigation;
