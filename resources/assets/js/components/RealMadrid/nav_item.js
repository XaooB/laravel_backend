import React from 'react';
import styled from 'styled-components';
import { FaExternalLinkAlt } from "react-icons/fa";

const Desc = styled.h4`
  color:#00529f;
  position:absolute;
  bottom:10px;
  font-size:.85em;
  padding-right:10px;
  transition:all .2s;
  font-family:'AvenirLTD';
  left:10px;
`

const Icon = styled.div`
  height:175px;
  display:flex;
  align-items:center;
  svg {
    font-size:4em;
    color:#00529f;
  }
`

const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex:1 1 125px;
  cursor:pointer;
  margin:10px 5px;
  max-height:175px;
  max-width:200px;
  overflow:hidden;
  border:1px solid #00529f;
  background:none;
  position:relative;
  &:hover {
    background: #00529f;
    ${Desc} {
      font-size:1.05em;
      color:#fff;
    }
    ${Icon} svg {
      color:#fff;
    }
  }
`

const NavItem = props => {
  const { name, icon } = props;

  return (
    <Container title={name}>
      <Icon>
        <FaExternalLinkAlt/>
      </Icon>
      <Desc>{name}</Desc>
    </Container>
  )
}

export default NavItem;
