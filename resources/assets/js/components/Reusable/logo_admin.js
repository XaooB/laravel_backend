import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display:flex;
  justify-content:center;
  padding:6px 0;
  height:50px;
  border-bottom:1px solid #F3F4F8;
  background:#fff;
`

const LinkTo = styled(Link)`
  color:#00529f;
`

const Title = styled.span`
  margin-bottom:-10px;
  display:block;
  text-transform: lowercase;
`

const SubTitle = styled.span`
  text-transform: uppercase;
  font-family: "SSPBK";
  align-self: flex-end;
  letter-spacing:1px;
  display:block;
  text-align:right;
`

const AdminLogo = () => {
  return (
    <Wrapper>
      <LinkTo to="/app">
        <Title>Real Madrid</Title>
        <SubTitle>POLSKA</SubTitle>
      </LinkTo>
    </Wrapper>
  )
}

export default AdminLogo;
