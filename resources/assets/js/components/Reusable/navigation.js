import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  color:#1e1e1e;
  font-size: .9em;
  font-weight:bold;
  align-self:center;
  text-transform: uppercase;
`

const List = styled.ul`
  list-style:none;
`

const ListLink = styled(Link)`
  color:inherit;
  padding:0 15px;
  transition: all .3s;
  &:hover {
    transition: all .3s;
    color:#ee324e;
  }
`

const ApiRoute = styled.a`
  background:#ee324e;
  color:#ffffff;
  padding:8px;
  position:relative;
  font-family: 'SSP';
`

const UserNav = styled.div`
  position:absolute;
  width:100%;
  padding:10px;
  left:0;
  bottom:0;
  background:#ee324e;
`

const UserName = styled.span`
  font-size:.9em;
`

const UserImage = styled.img`
  display:inline-block;
  height:30px;
  border-radius:100%;
`

const GoogleIcon = styled.span`
  display:inline-block;
  line-height:1.1;
  text-transform: lowercase;
  padding-right:6px;
  margin-right:6px;
  border-right:1px solid rgba(255,255,255,.65);
`

const ListItem = styled.li`
  display:inline-block;
  letter-spacing:1.2px;
`

const Navigation = props => {
  return (
    <Nav>
      <List>
        <ListLink to='/news'>
          <ListItem>wiadomości</ListItem>
        </ListLink>
        <ListLink to='/club'>
          <ListItem>real madryt</ListItem>
        </ListLink>
        <ListLink to='/schedule'>
          <ListItem>terminarz</ListItem>
        </ListLink>
        <ListLink to='/live'>
          <ListItem>na żywo</ListItem>
        </ListLink>
        <ListLink to='/contact'>
          <ListItem>kontakt</ListItem>
        </ListLink>
      </List>
    </Nav>
  )
}

export default Navigation;
