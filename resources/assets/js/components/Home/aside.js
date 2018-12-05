import React from 'react';
import styled from 'styled-components';
import AsideItem from './aside_item';

const Container = styled.div`
  position:absolute;
  display:flex;
  flex-flow:row nowrap;
  width:863px;
  justify-content: space-between;
  right:120px;
  bottom:-70px;
  padding:1px;
  background:white;
`

const Aside = props => {
  return (
    <Container>
      {props.data.map((item, key) => <AsideItem key={key} data={item} />)}
    </Container>
  )
}

export default Aside;
