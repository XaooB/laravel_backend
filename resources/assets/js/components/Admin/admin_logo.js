import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #ee324e;
  padding:15px;
  min-width:200px;
  height:50px;
`

const Text = styled.span`
  color:#fff;
  font-family: 'SSPB';
  text-align:center;
  display:block;
  text-transform: uppercase;
  font-family:'SSPBK';
`

const Logo = () => {
  return (
   <Wrapper>
    <Text>admin panel</Text>
   </Wrapper>
  )
}

export default Logo;
