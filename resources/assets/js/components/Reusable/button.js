import React from 'react';
import styled from 'styled-components';
import MiniLoader from './mini_loader';

const Btn = styled.button`
  padding:10px 12px;
  display:flex;
  justify-content:center;
  align-items:center;
  min-width:150px;
  cursor:pointer;
  border-radius:6px;
  align-self:center;
  transition: all .25s;
  background: none;
  flex: ${props => props.fullWidth ? '1' : 'initial'};
  color: ${props => props.colorBlue ? '#00529f' : '#ee324e'};
  border: ${props => props.colorBlue ? '1px solid  #00529f' : '1px solid  #ee324e'};
  &:hover {
    transition: all .25s;
    background: ${props => props.colorBlue ? '#00529f' : '#ee324e'};
    color:white;
  }
`

const BtnDisabled = styled.button`
  padding:8px 12px;
  display:flex;
  justify-content:center;
  align-items:center;
  min-width:150px;
  cursor:default;
  align-self:center;
  background:#00529f;
  transition: all .25s;
  border:  1px solid  #00529f;
  flex: ${props => props.fullWidth ? '1' : 'initial'};
`

const Spinner = styled.div`
  border: 4px solid #fff;
  border-radius: 50%;
  border-top: 4px solid #00529f;
  width: 18px;
  height: 18px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const Button = props => {
  const { isFetching } = props;

  return (
      isFetching ?
      (
        <BtnDisabled
          fullWidth={props.fullWidth}
          type='button'
          onClick={props.onClick}
          disabled
          >
          <Spinner />
        </BtnDisabled>
      ) : (
        <Btn
          fullWidth={props.fullWidth}
          type='button'
          colorBlue={props.colorBlue}
          onClick={props.onClick}
          >{props.name}
        </Btn>
      )
  )
}

export default Button;
