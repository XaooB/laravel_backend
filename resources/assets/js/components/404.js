import React from 'react'
import styled from 'styled-components';
import Logo from './Reusable/logo'
import { Link } from 'react-router-dom';

const Container = styled.div`
  display:flex;
  align-content:center;
  flex-flow:column nowrap;
  color:#d8d8d8;
  justify-content:center;
  align-items:center;
  left:0;
  top:0;
  position:fixed;
  background:#fff;
  z-index:9999;
  width:100%;
  height:100%;
`

const Information = styled.p`
  margin-top:5px;
  font-size:1.2em;
`

const LinkTo = styled(Link)`
  margin-top:30px;
  font-size:1.1em;
  display:block;
  font-family:'SSPL';
  color:#ee324e;
`

const Title = styled.h2`
  margin-top:20px;
  font-size:2.3em;
  color:#1e1e1e;
`

const Wrapper = styled.div`
  display:flex;
  align-items:center;
`

const NotFound = () => {
  return (
    <Container>
      <Logo />
      <Title>Error 404: Not Found</Title>
      <Information>It seems like you got lost. There is nothing here.</Information>
      <LinkTo to='/'>GO BACK</LinkTo>
    </Container>
  )
}

export default NotFound;
