import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import {
  FiLogOut,
  FiMessageSquare,
} from 'react-icons/fi';
import {
  IoIosNotifications,
  IoMdSettings,
} from 'react-icons/io';
import { Link } from 'react-router-dom';
import Logo from './logo';
import Searchbar from './searchbar';
import Navigation from './navigation';
import Wrapper from './wrapper';

const Topbar = styled.header`
  padding: 12px 5px;
  height:69px;
  background:#fff;
  border-bottom:1px solid #ededed;
  display: flex;
  width:100%;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  position:sticky;
  top:0;
  z-index:999;
`;

const User = styled.section`
  position:relative;
  z-index:1;
  cursor: pointer;
  align-self:center;
  justify-content:space-between;
  font-family: 'SSP';
  display:flex;
  margin-left:15px;
  align-items:center;
`;

const Text = styled.span`
  display:block;
  margin-left:6px;
  text-transform:lowercase;
  letter-spacing:1px;
  line-height:1;
  color:#1e1e1e;
  &:last-child {
    font-size:.9em;
    color:#d8d8d8;
  }
`;

const UserImage = styled.img`
  display:inline-block;
  height:35px;
  border-radius:100%;
`;

const UserInfo = styled.div`
  display:flex;
  flex-flow:column nowrap;
`;

const ShowNav = styled.span`
  margin-left:20px;
  display:block;
  height:20px;
  width:20px;
  position:relative;
  &:before {
    font-size:.8em;
    position:absolute;
    content:'▶';
    left:50%;
    top:10%;
    transform: translate(-50%) rotate(90deg);
    color:#555555;
  }
`;

const UserNav = styled.ul`
  padding:1px;
  position:absolute;
  top:52px;
  left:0;
  width:100%;
  background: #fff;
  list-style-type:none;
`;

const NavText = styled.span`
  color:#555555;
  margin-left:6px;
  font-size:.95em;
`;

const NavItem = styled(Link)`
  padding: 10px;
  cursor:pointer;
  color:#ededed;
  display:flex;
  flex-flow:row nowrap;
  align-items:center;
  &:hover {
    background:#00529f;
    svg {
      color:#ffffff;
    }
    ${NavText} {
      color:#fff;
    }
  }
  svg {
    color:#555555;
    font-size:.95em;
  }
`;

const ApiLink = styled.a`
  display:flex;
  flex-flow:row nowrap;
  align-items:center;
  padding: 10px;
  color:#ededed;
  font-size:.95em;
  svg {
    font-size:.95em;
    color:#555555;
  }
  &:hover {
    background:#00529f;
    svg {
      color:#ffffff;
    }
    ${NavText} {
      color:#ffffff;
    }
`;

const Counter = styled.span`
  background: #ee324e;
  font-size:.9em;
  padding:0 6px;
  margin-left:4px;
  display:block;
  border-radius:3px;
  color:#ffffff;
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleNav: false,
    };

    // have to use this approach instead of arrow function because it wasn't working..
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    const { toggleNav } = this.state;
    this.setState({ toggleNav: !toggleNav });
  }

  showNavigation() {
    const { toggleNav } = this.state;
    const { user } = this.props.user;

    if (toggleNav) {
      return (
        <UserNav>
          <NavItem to="/profile">
            <FaUser />
            <NavText>Mój profil</NavText>
          </NavItem>
          <NavItem to="/notifications">
            <IoIosNotifications />
            <NavText>Powiadomienia</NavText>
            <Counter>2</Counter>
          </NavItem>
          <NavItem to="/notifications">
            <FiMessageSquare />
            <NavText>Wiadomości</NavText>
          </NavItem>
          {
            !user[0].privileges !== 'użytkownik'
            ? <NavItem to="/admin/dashboard">
                <IoMdSettings />
                <NavText>Panel administracyjny</NavText>
              </NavItem>
              : ''
          }
          <ApiLink href="/api/auth/google/logout">
            <FiLogOut />
            <NavText>Wyloguj</NavText>
          </ApiLink>
        </UserNav>
      );
    }
    return '';
  }

  render() {
    const { user } = this.props.user;

    return (
      <Topbar>
        <Logo />
        <Wrapper>
          <Searchbar />
          <Wrapper>
            <Navigation />
            {
              !user.length ? (
                <User>
                  <a href="/api/auth/google">
                    <div id="customBtn" className="customGPlusSignIn">
                      <span className="icon" />
                      <span className="buttonText">Zaloguj się</span>
                    </div>
                  </a>
                </User>
              ) : (
                <User onClick={this.toggleNav}>
                  <Wrapper>
                    <UserImage src={user[0].image} />
                    <UserInfo>
                      <Text>{user[0].name}</Text>
                      <Text>{user[0].email}</Text>
                    </UserInfo>
                  </Wrapper>
                  <ShowNav />
                  { this.showNavigation() }
                </User>
              )}
          </Wrapper>
        </Wrapper>
      </Topbar>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Header);
