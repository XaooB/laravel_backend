import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display:flex;
  align-content:center;
  justify-content:center;
  align-items:center;
  left:0;
  top:0;
  position:fixed;
  width:100%;
  height:100%;
`

const TextWrapper = styled.div`
  max-width:50%;
`

const Title = styled.h2`
  color:#ee324e
  font-size:5em;
  font-family:'DoHyeon';
`

const Information = styled.p`
  font-size:2em;
  color:#1e1e1e;
`

const LinkTo = styled(Link)`
  color:#1e1e1e;
  font-family:'AvenirD';
`

const NotFound = () => {
  return (
    <Container>
      <TextWrapper>
        <Title>404 - Not Found</Title>
        <Information>Go back to the <LinkTo to='/'>home page</LinkTo>.</Information>
      </TextWrapper>
    </Container>
  )
}

export default NotFound;
