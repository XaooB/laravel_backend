import React, { Component } from 'react';
import styled from 'styled-components';
import PollList from './poll_list';
import PageHeader from '../../components/Reusable/PageHeader'
import Button from '../Reusable/button';

const Wrapper = styled.div`
  flex:1 1 300px;
  margin:20px 0;
`

const Header = styled.header`
  padding:8px 4px;
  font-size:.9em;
  border-radius: 6px;
  color:#777;
  background: #ededed;
`

const Category = styled.p`
  text-transform: uppercase;
  font-size:.9em;
`

const Topic = styled.p`
  color:#1e1e1e;
  margin:15px 5px;
`

const Title = styled.h4`
  font-family: 'AvenirLTD';
  padding:0 5px;
  text-transform: uppercase;
`

const Form = styled.form`
  display:flex;
  flex-flow:column nowrap;
  color:#1e1e1e;
`

class StrawPoll extends Component {
  render() {
    const { topic } = this.props.pollData;

    return (
      <Wrapper>
        <Header>
          <Title>Ankieta</Title>
        </Header>
        <Topic>{ topic }</Topic>
        <Form>
          <PollList pollData={this.props.pollData} />
          <div style={{display:'flex'}}>
            <Button name='Oddaj głos' fullWidth colorBlue />
          </div>
        </Form>
      </Wrapper>
    )
  }
}

export default StrawPoll;
