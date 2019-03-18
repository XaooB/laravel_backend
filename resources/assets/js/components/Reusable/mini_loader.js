import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  margin-right:8px;
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  border-top: 6px solid #3f3f3f;
  width: 32px;
  height: 32px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const Wrapper = styled.div`
  margin-top: ${props => props.margin ? `${props.margin}px` : '0'};
  display:flex;
  align-items:center;
  justify-content:center;
`

const MiniLoader = props => {
  return (
    <Wrapper margin={props.margin}>
      <Spinner />
    </Wrapper>
  )
}

export default MiniLoader;
