import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display:flex;
  flex-flow: row wrap;
  justify-content: space-between;
`


const Wrapper = props => {
  return (
    <Container>{props.children}</Container>
  )
}

export default Wrapper;
