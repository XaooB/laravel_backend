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
  margin-right:8px;
  border: 12px solid #f3f3f3;
  border-radius: 50%;
  border-top: 12px solid #3f3f3f;
  width: 100px;
  height: 100px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
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
      <Spinner></Spinner>
    </Wrapper>
  )
}

export default Loader;
