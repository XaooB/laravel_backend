import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  font-family: 'SSPBK';
  color:#1e1e1e;
  font-size: .95em;
  text-transform: uppercase;
`

const List = styled.ul`
  list-style:none;
`

const ListLink = styled(Link)`
  color:inherit;
  padding:0 15px;
  &:hover {
    color:#ee324e;
  }
`

const ApiRoute = styled.a`
  background:#ee324e;
  color:#ffffff;
  padding:8px;
  font-family: 'SSP';
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
  const { user } = props.auth;

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
        {
          !user.length ?
          <ApiRoute href='/api/auth/google'>
            <GoogleIcon>g+</GoogleIcon>
            <ListItem>Sign In</ListItem>
          </ApiRoute> :
          <ApiRoute to='/user'>
            Hello, {user.name}
          </ApiRoute>
        }
      </List>
    </Nav>
  )
}

export default Navigation;
