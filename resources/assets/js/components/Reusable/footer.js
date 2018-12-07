import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.footer`
  width:100%;
`

const FooterNav = styled.div`
  display:flex;
  flex-flow: row wrap;
  background:#ededed;
  padding: 35px 80px 100px;
  margin-bottom:1px;
  text-transform: uppercase;
`

const NavItem = styled.div`
  margin-top:15px;
  flex:1;
  color:#474747;
`

const Category = styled.h5`
  color:#1e1e1e;
  font-family: 'AvenirB';
  font-size: 1.1em;
  display:inline-block;
  position:relative
  &:before {
    content:'';
    position:absolute;
    width:30px;
    height:3px;
    background:#ee324e;
    left:0;
    bottom:-4px;
  }
`

const List = styled.ul`
  list-style-type: none;
  margin-top:15px;
`

const ListItem = styled.li`
  font-size:.875em;
  line-height:1.4em;
`

const LinkTo = styled(Link)`
  color:inherit;
  &:hover {
    color:#ee324e;
  }
`

const Copyright = styled.p`
  background:#d8d8d8;
  padding:18px;
  text-align:center;
`

const CopyrightText = styled.span`
  text-transform:uppercase;
  font-size: .6875em;
  letter-spacing:1px;
  color:#1e1e1e;
`

const Footer = () => {
  return (
    <Wrapper>
      <FooterNav>
        <NavItem>
          <Category>news</Category>
          <List>
            <ListItem>
              <LinkTo to='/club'>club</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/training'>training</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/injuries'>injuries</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/transfers'>transfers</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/rumors'>rumors</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/archives'>archives</LinkTo>
            </ListItem>
          </List>
        </NavItem>
        <NavItem>
          <Category>Schedule</Category>
          <List>
            <ListItem>
              <LinkTo to='/la liga'>la liga</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/champion-league'>champion league</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/copa-del-ray'>copa del ray</LinkTo>
            </ListItem>
          </List>
        </NavItem>
        <NavItem>
          <Category>fixtures</Category>
          <List>
            <ListItem>
              <LinkTo to='/la liga'>la liga</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/champion-league'>champion league</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/supercopa'>supercopa</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/fifa-club-world-cup'>fifa club world cup</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/uefa-super-cup'>uefa super cup</LinkTo>
            </ListItem>
          </List>
        </NavItem>
        <NavItem>
          <Category>club</Category>
          <List>
            <ListItem>
              <LinkTo to='/squad'>squad</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/results'>results</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/opponents'>opponents</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/statistics'>statistics</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/anthem'>anthem</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/stadium'>stadium</LinkTo>
            </ListItem>
          </List>
        </NavItem>
        <NavItem>
          <Category>history</Category>
          <List>
            <ListItem>
              <LinkTo to='/club'>club</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/legends'>legends</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/preisdents'>preisdents</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/stadium'>stadium</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/trophies'>trophies</LinkTo>
            </ListItem>
            <ListItem>
              <LinkTo to='/santiago-bernabeu'>santiago bernabeu</LinkTo>
            </ListItem>
          </List>
        </NavItem>
      </FooterNav>
      <Copyright>
        <CopyrightText>©2018 REAL MADRID.  ALL RIGHTS RESERVED.</CopyrightText>
      </Copyright>
    </Wrapper>
  )
}

export default Footer;
