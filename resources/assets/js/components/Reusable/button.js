import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  padding:10px 12px;
  cursor:pointer;
  align-self:center;
  background:none;
  transition: all .25s;
  flex: ${props => props.fullWidth ? '1' : 'initial'};
  color: ${props => props.colorBlue ? '#00529f' : '#ee324e'};
  border: ${props => props.colorBlue ? '1px solid  #00529f' : '1px solid  #ee324e'};
  &:hover {
    transition: all .25s;
    background: ${props => props.colorBlue ? '#00529f' : '#ee324e'};
    color:white;
  }
`

const Button = props => (
  <Btn
    fullWidth={props.fullWidth}
    colorBlue={props.colorBlue}
    type='button'
    onClick={props.onClick}
  >{props.name}</Btn>
);

export default Button;
