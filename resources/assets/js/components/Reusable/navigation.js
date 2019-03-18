import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  display:none;
  color:#00529f;
  font-size:.8em;
  font-fmily:'AvenirLTD';
  text-transform: uppercase;
  @media (min-width: 640px) {
    display:block;
  }
`

const MobileNav = styled.div`
  display:flex;
  padding:4px 6px;
  align-items:center;
  color:#fff;
  font-size: 1.3em;
  font-family:'SSPBK'
  justify-content:center;
  background: #00529f;
  @media (min-width: 640px) {
    display:none;
  }
`

const List = styled.ul`
  list-style:none;
`

const ListLink = styled(Link)`
  color:inherit;
  transition: all .3s;
  padding:30px 10px;
  position:relative;
  &:before {
    position:absolute;
    content: '';
    width:.1px;
    height:3px;
    bottom:-3px;
    left:50%;
    background:#00529f;
    transform: translateX(-50%);
    transition:.2s all;
  }
  &:hover {
    font-weight:bold;
    &:before {
      width:100%;
    }
  }
`

const UserNav = styled.div`
  position:absolute;
  width:100%;
  padding:10px 5px;
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

const ListItem = styled.li`
  display:inline-block;
  letter-spacing:1.2px;
`

const Navigation = props => {
  return (
        <Nav>
          <List>
            <ListLink to='/app/news'>
              <ListItem>wiadomości</ListItem>
            </ListLink>
            <ListLink to='/app/club'>
              <ListItem>real madryt</ListItem>
            </ListLink>
            <ListLink to='/app/schedule'>
              <ListItem>terminarz</ListItem>
            </ListLink>
            <ListLink to='/app/live'>
              <ListItem>na żywo</ListItem>
            </ListLink>
            <ListLink to='/app/contact'>
              <ListItem>kontakt</ListItem>
            </ListLink>
          </List>
        </Nav>
  )
}

export default Navigation;
