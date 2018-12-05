import React, { Component } from 'react';
import styled from 'styled-components';
import PollList from './poll_list';
import Button from '../Reusable/button';

const Wrapper = styled.div`
  flex:.4 1 300px;
  margin-right:20px;
`

const Header = styled.header`
  background: #00529f;
  padding:20px;
`

const Category = styled.p`
  text-transform: uppercase;
  font-size:.9em;
`

const Title = styled.h4`
  margin-top:10px;
  font-family: 'AvenirD';
  font-size: 1.375em;
`

const Form = styled.form`
  margin-top:15px;
  display:flex;
  flex-flow:column nowrap;
  color:#1e1e1e;
`

class StrawPoll extends Component {
  render() {
    const {topic} = this.props.pollData[0];

    return (
      <Wrapper>
        <Header>
          <Category>straw poll</Category>
          <Title>{ topic }</Title>
        </Header>
        <Form>
          <PollList pollData={this.props.pollData[0]} />
          <div style={{display:'flex'}}>
            <Button name='Vote' fullWidth colorBlue />
          </div>
        </Form>
      </Wrapper>
    )
  }
}

export default StrawPoll;
