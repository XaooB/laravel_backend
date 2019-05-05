import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  padding:15px 0;
  position:sticky;
  z-index:20;
  top:96px;
  background:#fff;
  display:flex;
  flex-flow:row nowrap;
  justify-content:space-between;
  border-bottom:1px solid #ededed;
  color:#1e1e1e;
  @media (min-width: 640px) {
    top:0;
  }
`

const Title = styled.h3`
  font-family:'AvenirLTR';
  font-size:1.25em;
  font-weight:lighter;
`

const PageHeader = props => <Header><Title>{ props.children }</Title></Header>
export default PageHeader;
