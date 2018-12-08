import React from 'react';
import styled from 'styled-components';
import Logo from './logo';
import Searchbar from './searchbar';
import Navigation from './navigation';
import Wrapper from './wrapper'
import { connect } from 'react-redux';

const Topbar = styled.header`
  padding: 15px 0;
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
`

const Header = props => {
  const { auth } = props;

  return (
    <Topbar>
      <Logo />
      <Wrapper>
        <Searchbar />
        <Navigation auth = {auth} />
      </Wrapper>
    </Topbar>
  )
}

function mapStateToProps({auth}) {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Header);
