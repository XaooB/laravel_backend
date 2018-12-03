import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../Reusable/button';
import Wrapper from '../Reusable/wrapper';

const Form = styled.form`
  flex:8;
  width:100%;
  margin-left:5px;
`

const TextField = styled.textarea`
  font-size:1.1em;
  resize:vertical;
  line-height:1.5;
  width:100%;
  border-radius:5px;
  border:2px solid rgb(169, 169, 169);
  min-height:80px;
  max-height:200px;
  padding:10px;
  margin-bottom:10px;
  outline:none;
  transition: all .25s;
  &:focus {
    transition: all .25s;
    border:2px solid #00529f;
    border-radius: 5px;
  }
`

const Counter = styled.span`
  font-weight:lighter;
  display:block;
  align-self:center;
  color: rgb(169, 169, 169);
  font-size:.85em;
`

class AddCommentForm extends Component {
  render() {
    return (
      <Form>
        <TextField></TextField>
        <Wrapper>
          <Counter>Characters used: 0/500</Counter>
          <Button name='Post message' colorBlue />
        </Wrapper>
      </Form>
    )
  }
}

export default AddCommentForm;
