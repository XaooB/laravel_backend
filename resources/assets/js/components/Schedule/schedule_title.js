import React from 'react';
import styled from 'styled-components';

const Header = styled.h3`
  text-transform: uppercase;
  color:#1e1e1e;
  padding:15px 0;
  border-bottom:1px solid #ededed;
  font-family:'Bebas';
  font-size:1.5em;
  font-weight:lighter;
`

const Title = props => <Header>{ props.children }</Header>
export default Title;
