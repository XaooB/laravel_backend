import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  border:none;
  padding:10px 12px;
  display:flex;
  justify-content:center;
  align-items:center;
  min-width:150px;
  cursor:pointer;
  border-radius: 6px;
  align-self:center;
  transition: all .25s;
  border:1px solid #00529f;
  background: ${props => props.colorBlue ? '#00529f' : '#fff'};
  color: ${props => props.colorBlue ? '#fff' : '#00529f'};
`

const Button = props => {
  const { isFetching } = props;

  return (
    <Btn
      fullWidth={props.fullWidth}
      type='button'
      colorBlue={props.colorBlue}
      onClick={props.onClick}
      >{props.name}
    </Btn>
  )
}

export default Button;
