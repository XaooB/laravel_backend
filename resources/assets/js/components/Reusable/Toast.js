import React, { Component } from 'react';
import styled from 'styled-components';

const ToastWrapper = styled.div`
  position:fixed;
  bottom:30px;
  left:50%;
  padding:15px 20px;
  border-radius: 6px;
  background:#16a085;
  color:#fff;
  transform: translateX(-50%) translateY(-50%);
  transition: all .3s ease-in-out;
`

const ToastWrapper2 = styled.div`
  position:fixed;
  bottom:30px;
  left:50%;
  padding:15px 20px;
  border-radius: 6px;
  background:#16a085;
  color:#fff;
  transform: translateX(-50%) translateY(170%);
  transition: all .3s ease-in-out;
`

const Message = styled.p`
  font-size:.9em;
`

class Toast extends Component {
  constructor (props) {
    super(props);

    this.state = {
      visible: false
    }
  }

  componentWillReceiveProps (nextProps) {
   if (this.props.visible !== nextProps.visible) {
     this.setState({
       visible: nextProps.visible
     })
   }
  }

  render () {
    const { message } = this.props;

    return (
      <div>
      {
        this.state.visible ?
        (
          <ToastWrapper>
          <Message>{message}</Message>
          </ToastWrapper>
        ) : (
          <ToastWrapper2>
          <Message>{message}</Message>
          </ToastWrapper2>
        )
      }
      </div>
    )
  }
}

export default Toast;
