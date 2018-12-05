import React from 'react';
import styled from 'styled-components';
import Logo from './logo';
import Navigation from './navigation';

const Topbar = styled.header`
  padding: 25px 75px;
  display: flex;
  width:100%;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  position:relative;
  z-index:1;
  top:0;
  left:0;
`


const Header = () => {
  return (
    <Topbar>
      <Logo />
      <Navigation />
    </Topbar>
  )
}

export default Header;
