import React from 'react';
import styled from 'styled-components';
import MiniLoader from './mini_loader';

const Btn = styled.button`
  padding:10px 12px;
  display:flex;
  margin-bottom:6px;
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
  margin-bottom:6px;
  border-radius:6px;
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
    margin: 4px auto 0;
    width: 36px;
    text-align: center;
  > div {
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: spin 1.4s infinite ease-in-out both;
    animation: spin 1.4s infinite ease-in-out both;
    &:nth-child(1) {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
  }

  @keyframes spin {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
`

const Button = props => {
  const { isFetching } = props;

  return (
      isFetching ?
      (
        <BtnDisabled disabled>
          <Spinner>
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </Spinner>
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
