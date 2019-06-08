import React, { Fragment } from 'react';
import styled from 'styled-components';
import variablesCSS from '../../css/variables';

const Button = styled.button`
  display:inline-flex;
  justify-content:space-between;
  align-items:center;
  cursor:pointer;
  background:${variablesCSS.blue};
  outline:none;
  border:1px solid #999;
  border-radius:${variablesCSS.radius};
  padding:8px 8px;
  margin:2px 0;
  margin-right: 6px;
  svg {
    color:#fff !important;
    margin-right: 3px;
  }
`

const Text = styled.span`
  display:block;
  color:#fff;
`

const ActionButton = props => {
  return (
    <Button onClick={props.onClick} >
      <Fragment>
        { props.icon }
        <Text>{ props.name }</Text>
      </Fragment>
    </Button>
  )
}

export default ActionButton;
