import React from 'react';
import styled from 'styled-components';
import Logo from './logo'

const Wrapper = styled.div`
  background:#fff;
  position:fixed;
  z-index:9999;
  top:0;
  left:0;
  width:100%;
  height:100%;
  flex-flow:column nowrap;
  display:flex;
  align-items:center;
  justify-content:center;
`

const Spinner = styled.div`
  margin-top:10px;
  display: inline-block;
  position: relative;
  width: 256px
  height: 256px;
  & div {
    position: absolute;
    border: 4px solid #ee324e;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
  @keyframes lds-ripple {
  0% {
    top: 112px;
    left: 112px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 232px;
    height: 232px;
    opacity: 0;
  }
}

`

const Loader = () => {
  return (
    <Wrapper>
      <Spinner><div></div><div></div></Spinner>
    </Wrapper>
  )
}

export default Loader;
