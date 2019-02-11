import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display:flex;
  justify-content:center;
  border-radius:6px;
  align-items:center;
  width:42px;
  height:36px;
  background: rgb(238,50,78);
  background: linear-gradient(125deg, rgba(238,50,78,1) 0%, rgba(232,75,105,1) 100%);
  color:white;
  margin-right:5px;
  font-size:.9em;
  font-family: 'Verdana';
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
`

const Logo = () => {
  return (
    <LinkTo to="/">
      <Wrapper>
        <LogoText>RM</LogoText>
      </Wrapper>
    </LinkTo>
  )
}

export default Logo;
