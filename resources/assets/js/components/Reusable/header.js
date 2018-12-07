import React from 'react';
import styled from 'styled-components';
import Logo from './logo';
import Searchbar from './searchbar';
import Navigation from './navigation';
import Wrapper from './wrapper'

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

const Header = () => {
  return (
    <Topbar>
      <Logo />
      <Wrapper>
        <Searchbar />
        <Navigation />
      </Wrapper>
    </Topbar>
  )
}

export default Header;
