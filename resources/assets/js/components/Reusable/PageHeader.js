import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  margin-top:30px;
  margin-bottom:45px;
`

const Title = styled.h3`
  font-family: 'AvenirB';
  font-size: 2.5em;
  padding-left:16px;
  color:#1e1e1e;
  text-transform: uppercase;
  position:relative;
  display:inline-block;
  &:before {
    content: '';
    position:absolute;
    left:0;
    top:9px;
    height:31px;
    width:5px;
    background: #00529f;
  }
`

const PageHeader = props => {
  return (
    <Header>
      <Title>{props.subtitle} {props.title}</Title>
    </Header>
  )
}

export default PageHeader;
