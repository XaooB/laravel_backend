import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display:flex;
  justify-content:flex-end;
  background:#ededed;
  padding:15px 10px;
  margin: 0 10px;
  color:#1e1e1e;
`

const UserProfile = styled.div`
  display:flex;
  flex-flow:row nowrap;
  justify-content:space-bewtween;
`

const LinkTo = styled.a`
  color:inherit;
  display:inline-block;
`


const Topbar = props => {
  return (
    <Container>
      <UserProfile>
        <LinkTo href="/api/auth/google">Log In</LinkTo>
      </UserProfile>
    </Container>
  )
}

export default Topbar;