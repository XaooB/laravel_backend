import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  background:#ee324e;
  display:flex;
  justify-content:center;
  align-items:center;
  width:42px;
  height:36px;
  font-size:1.1em;
  color:white;
  margin-right:5px;
  font-family: 'SSPBK';
  & + span {
    color:#d8d8d8;
  }
`

const LogoText = styled.span`
  color:inherit;
  letter-spacing:1px;
`

const LinkTo = styled(Link)`
  display:flex;
  align-items:center;
  font-family: "SSP";
  color:#1e1e1e;
  &:hover ${Wrapper} + span {
    color:#ee324e;
  }
`

const Logo = () => {
  return (
    <LinkTo to='/'>
      <Wrapper>
        <LogoText>RM</LogoText>
      </Wrapper>
      <LogoText>Polska</LogoText>
    </LinkTo>
  )
}

export default Logo;
