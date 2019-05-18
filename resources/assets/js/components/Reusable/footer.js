import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  margin-top:100px;
`

const FooterNav = styled.nav`
  max-width:1300px;
  margin: 0 auto;
  padding: 40px 0 80px 0;
  display:flex;
  flex-flow: row wrap;
`

const FooterBackground = styled.footer`
  background:#ededed;
  margin-bottom:1px;
`

const NavItem = styled.div`
  flex:1;
  color:#474747;
  padding:15px 10px;
`

const Category = styled.h5`
  color:#1e1e1e;
  text-transform: uppercase;
  font-family: 'SSPB';
  font-size: 1.1em;
  display:inline-block;
  position:relative
  &:before {
    content:'';
    position:absolute;
    width:30px;
    height:3px;
    background:#FEBE10;
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
  font-size:1.1em;
  &:hover {
    color:#FEBE10;
  }
`

const Copyright = styled.div`
  background:#d8d8d8;
  padding:0 20px;
  text-align:center;
  padding-top:30px;
  padding-bottom: 65px;
`

const CopyrightText = styled.span`
  text-transform:uppercase;
  font-size: .6875em;
  letter-spacing:1px;
  color:#1e1e1e;
`

const Footer = (props) => {

  return (
    <Wrapper>
      <FooterBackground>
        <FooterNav>
          <NavItem>
            <Category>Wiadomości</Category>
            <List>
              <ListItem>
                <LinkTo to='/app/club'>Klub</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/training'>Trening</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/injuries'>Kontuzje</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/transfers'>Transfery</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/rumors'>Plotki</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/archives'>Archiwum</LinkTo>
              </ListItem>
            </List>
          </NavItem>
          <NavItem>
            <Category>Terminarz</Category>
            <List>
              <ListItem>
                <LinkTo to='/app/la liga'>Liga Hiszpańska</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/champion-league'>Liga Mistrzów</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/copa-del-ray'>Pochar Króla</LinkTo>
              </ListItem>
            </List>
          </NavItem>
          <NavItem>
            <Category>Rozgrywki</Category>
            <List>
              <ListItem>
                <LinkTo to='/app/la liga'>Liga Hiszpańska</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/champion-league'>Liga Mistrzów</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/supercopa'>Superpuchar Hiszpani</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/fifa-club-world-cup'>Klubowe Mistrzostwa Świata</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/uefa-super-cup'>Superpuchar Europy</LinkTo>
              </ListItem>
            </List>
          </NavItem>
          <NavItem>
            <Category>Klub</Category>
            <List>
              <ListItem>
                <LinkTo to='/app/squad'>Skład</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/results'>Wyniki</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/statistics'>Statystyki</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/league-table'>Tabela ligowa</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/anthem'>Hymn</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/stadium'>Stadion</LinkTo>
              </ListItem>
            </List>
          </NavItem>
          <NavItem>
            <Category>Historia</Category>
            <List>
              <ListItem>
                <LinkTo to='/app/club'>Klub</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/legends'>Legendy</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/preisdents'>Prezesi</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/trophies'>Trofea</LinkTo>
              </ListItem>
              <ListItem>
                <LinkTo to='/app/santiago-bernabeu'>Santiago Bernabeu</LinkTo>
              </ListItem>
            </List>
          </NavItem>
        </FooterNav>
      </FooterBackground>
        <Copyright>
          <CopyrightText>©2018 - {new Date().getFullYear()} PORTAL-WERTYKALNY.  ALL RIGHTS RESERVED.</CopyrightText>
        </Copyright>
    </Wrapper>
  )
}

export default Footer;
