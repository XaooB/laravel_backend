import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaInfoCircle, FaLongArrowAltLeft, FaRegNewspaper, FaHome, FaShieldAlt, FaRegCalendarAlt, FaRegPlayCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMdSettings } from 'react-icons/io';
import { FiMessageSquare } from 'react-icons/fi';
import { MdContactMail } from "react-icons/md";
import Logo from './logo';

const Hamburger = styled.label`
  position:relative;
  border:none;
  cursor: pointer;
  background:#fff;
  right:0;
  outline:none;
  padding:17px 20px;
  border:1px solid #ededed;
  border-bottom:2px solid #ededed;
  &:after {
    content:'☰';
    color:#00529f;
    font-family:'SSPBK';
    font-size: 1.3em;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
`

const NavWrapper = styled.div`
  display:block;
  @media (min-width: 640px) {
    display:none;
  }
`

const MobileNav = styled.nav`
  z-index:998;
  width:42px;
  top:96px;
  background:#fff;
  height:calc(100% - 53px);
  position:fixed;
  right:0;
  transition: all .5s;
  transition-timing-function: cubic-bezier(1,.11,.5,.85);
  @media (min-width: 640px) {
    display:none;
  }
`

const SubMobileNav = styled.nav`
  display:block;
  width:42px;
  top:96px;
  background:#fff;
  height:calc(100% - 48px);
  position:fixed;
  right:-42px;
  transition: all .5s;
  transition-timing-function: cubic-bezier(1,.11,.5,.85);
  @media (min-width: 640px) {
    display:none;
  }
`

const NavList = styled.ul`
  border-left:1px solid #ededed;
  height:inherit;
  display:flex;
  flex-flow: row wrap;
  min-width:220px;
  position:absolute;
  right:-178px;
  list-style-type: none;
  background:#fff;
`

const Checkbox = styled.input`
  display:none;
  &:checked ~ ${MobileNav} {
    width:100%;
    ${NavList} {
      right:unset;
      left:0;
    }
  }
  &:checked ~ ${Hamburger} {
    &:after {
      content: '❌';
    }
  }
`

const CheckboxSub = styled.input`
  display:none;
  &:checked ~ ${SubMobileNav} {
    width:100%;
    ${NavList} {
      right:unset;
      left:0;
    }
  }
`

const ToggleSubNav = styled.label`
  width:100%;
  display:flex;
  align-items:center;
  min-height:40px;
  &:not(:last-child) {
    border-bottom:2px solid #ededed;
  }
`

const NavItem = styled.li`
  width:100%;
  display:flex;
  align-items:center;
  min-height:40px;
  &:not(:last-child) {
    border-bottom:2px solid #ededed;
  }
`

const NavTitle = styled.span`
  font-family:'SSPBK';
  text-transform: uppercase;
  display:block;
  line-height:1.5;
  font-size:1em;
`

const NavLink = styled(Link)`
  height:100%;
  width:100%;
  color:#00529f;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  &:hover ${NavTitle} {
    color:#00529f;
  }
  &:focus ${NavTitle} {
    color:#00529f;
  }
  svg {
    margin:0 8px;
    font-size:1.5em;
  }
`

const ApiRouteLink = styled.a`
  height:100%;
  width:100%;
  color:#00529f;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  svg {
    margin:0 8px;
    font-size:1.5em;
  }
  &:hover ${NavTitle} {
    color:#00529f;
  }
  &:focus ${NavTitle} {
    color:#00529f;
  }
`

const NavLinka = styled.div`
  height:100%;
  width:100%;
  color:#00529f;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  &:hover ${NavTitle} {
    color:#00529f;
  }
  &:focus ${NavTitle} {
    color:#00529f;
  }
  svg {
    margin:0 8px
    font-size:1.6em;
  }
`

const NavText = styled.div`
  color:#333;
  margin-left:10px;
`

const NavDesc = styled.span`
  margin-top: -2px;
  line-height:1;
  display:block;
  font-size:.7em;
  color:#777;
`

class MobileNavigation extends Component {
  closeSubNav() {
    let subNavCheckboxValue = document.querySelector('#toggleSubNav');

    if(subNavCheckboxValue)
      if(subNavCheckboxValue.checked)
        subNavCheckboxValue.click();
  }
  render() {
    const { user } = this.props;

    return (
      <NavWrapper>
        <Checkbox type='checkbox' id='toggleNav' />
        <Hamburger
          htmlFor='toggleNav'
          onClick={() => { this.closeSubNav() }}>
        </Hamburger>
        <MobileNav>
            <NavList>
            {
              !user.length ?
              (
                ''
              ) : (
                <Fragment>
                <ToggleSubNav htmlFor='toggleSubNav'>
                  <CheckboxSub type='checkbox' id='toggleSubNav' />




                  <SubMobileNav>
                    <NavList>
                      <NavItem>
                        <NavLinka>
                        <FaLongArrowAltLeft />
                          <NavText>
                            <NavTitle>Powrót</NavTitle>
                            <NavDesc>Kliknij, aby wrócić poziom wyżej</NavDesc>
                          </NavText>
                        </NavLinka>
                      </NavItem>
                      <NavItem>
                        <NavLink to={`/app/user/${user[0].iduser}`}>
                        <FaUserCircle />
                          <NavText>
                            <NavTitle>Mój profil</NavTitle>
                            <NavDesc>Informacje o twoim koncie</NavDesc>
                          </NavText>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink to='/app/user/messages'>
                        <FiMessageSquare />
                          <NavText>
                            <NavTitle>Wiadomości</NavTitle>
                            <NavDesc>Twoje wiadomości prywatne</NavDesc>
                          </NavText>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink to='/app/user/notifications'>
                        <FaInfoCircle />
                          <NavText>
                            <NavTitle>Powiadomienia</NavTitle>
                            <NavDesc>Bądź ciągle na bieżąco</NavDesc>
                          </NavText>
                        </NavLink>
                      </NavItem>
                      {
                        user[0].tier > 1 ?
                        (
                          <NavItem>
                            <NavLink to='/admin/dashboard'>
                            <IoMdSettings />
                              <NavText>
                                <NavTitle>Panel Administracyjny</NavTitle>
                                <NavDesc>Zarządaj treścią na portalu</NavDesc>
                              </NavText>
                            </NavLink>
                          </NavItem>
                        ) : (
                          ''
                        )
                      }
                      <NavItem>
                        <ApiRouteLink href='/api/google/auth/logout'>
                        <FaSignOutAlt />
                          <NavText>
                            <NavTitle>Wyloguj się</NavTitle>
                            <NavDesc>Kliknij, aby się wylogować z aplikacji</NavDesc>
                          </NavText>
                        </ApiRouteLink>
                      </NavItem>
                    </NavList>
                  </SubMobileNav>



                  <NavItem>
                    <NavLinka>
                    <FaUserCircle />
                      <NavText>
                        <NavTitle>Moje Konto</NavTitle>
                        <NavDesc>Przejdź, aby uzyskać dostęp do nowych funkcji</NavDesc>
                      </NavText>
                    </NavLinka>
                  </NavItem>
                  </ToggleSubNav>
              </Fragment>
              )
            }
              <NavItem>
                <NavLink to='/app'>
                <FaHome />
                  <NavText>
                    <NavTitle>Home</NavTitle>
                    <NavDesc>Przejdź do strony głównej</NavDesc>
                  </NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/app/news'>
                <FaRegNewspaper />
                  <NavText>
                    <NavTitle>Wiadomości</NavTitle>
                    <NavDesc>Najnowsze wiadomości</NavDesc>
                  </NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/app/realmadrid'>
                <FaShieldAlt />
                  <NavText>
                    <NavTitle>Real Madryt</NavTitle>
                    <NavDesc>Więcej informacji o klubie</NavDesc>
                  </NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/app/schedule'>
                <FaRegCalendarAlt />
                  <NavText>
                    <NavTitle>Terminarz</NavTitle>
                    <NavDesc>Nadchodzące mecze</NavDesc>
                  </NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/app/live'>
                <FaRegPlayCircle />
                  <NavText>
                    <NavTitle>Na żywo</NavTitle>
                    <NavDesc>Śledź wynik na bieżąco</NavDesc>
                  </NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/app/contact'>
                <MdContactMail />
                  <NavText>
                    <NavTitle>Kontakt</NavTitle>
                    <NavDesc>Jeśli masz pytanie, napisz</NavDesc>
                  </NavText>
                </NavLink>
              </NavItem>
            </NavList>
        </MobileNav>
      </NavWrapper>
    )
  }
}

export default MobileNavigation;
