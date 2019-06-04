import React from 'react';
import styled from 'styled-components';
import MiniLoader from './mini_loader';

const Btn = styled.button`
  border-radius:6px;
  border:none;
  cursor:pointer;
  padding:10px 20px;
  outline:none;
  margin: 0 6px;
  min-width:${props => props.minWidth ? '105px' : 'initial'};
  width: ${props => props.fullWidth ? '100%' : 'initial'};
  color:${props => props.warning ? '#ffffff' : 'rgb(119, 119, 119)'};
  background:${props => props.warning ? '#ee324e' : 'default'};
`

const Spinner = styled.div`
    text-align: center;
  > div {
    margin:0 1px;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bounce 1.4s infinite ease-in-out both;
    animation: bounce 1.4s infinite ease-in-out both;
    &:nth-child(1) {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
  }

  @keyframes bounce {
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
  const { isFetching, warning } = props;

  return (
      isFetching ?
      (
        <Btn
          warning={props.warning}
          minWidth={props.minWidth}
          fullWidth={props.fullWidth}>
          <Spinner>
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </Spinner>
        </Btn>
      ) : (
        <Btn
          fullWidth={props.fullWidth}
          type='button'
          colorBlue={props.colorBlue}
          onClick={props.onClick}
          warning={props.warning}
          minWidth={props.minWidth}
        >{props.name}</Btn>
      )
  )
}

export default Button;
