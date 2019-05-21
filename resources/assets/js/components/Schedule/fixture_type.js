import React, { Component } from 'react';
import styled from 'styled-components';
import Title from './schedule_title';
import { fixtureType } from '../../actions/'
import { connect } from 'react-redux';
import Wrapper from '../Reusable/wrapper';

const Container = styled.div`
  display:flex;
  margin:20px;
  flex-flow:column nowrap;
  justify-content:center;
`

const Logo = styled.img`
  height:60px;
  display:inline-block;
`

const Name = styled.span`
  display:block;
  text-align:center;
  text-transform:uppercase;
  font-family:'Bebas';
  font-size:1.25em;
  margin:6px 0;
`

const Checkbox = styled.label`
  cursor:pointer;
  position:relative;
  text-align:center;
  padding-bottom:12px;
  &:before {
    position:absolute;
    top:89%;
    left:50%;
    transform:translateX(-50%);
    content: '';
    width:10px;
    height:10px;
    border-radius:50%;
    border: 3px solid #FEBE10;
  }
`

const Input = styled.input`
  display:none;
  &:checked ~ ${Checkbox} {
    &:after {
      position:absolute;
      left:50%;
      top:96%;
      transform:translate(-50%, -50%);
      content: '';
      width:6px;
      height:6px;
      background:#FEBE10;
      border-radius:50%;
    }
  }
`

class FixtureType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: ''
    }
  }

  render() {
    const { name, fixtureType, type, checked, logo } = this.props;

    return (
      <Container>
        {
          checked ? <Input type='radio' id={type} name='fixtureType' defaultChecked /> : <Input type='radio' id={type} name='fixtureType' />
        }
        <Checkbox htmlFor={type} onClick={() => { fixtureType(type) }}>
          <Logo src={`/img/${logo}`} title={name} alt={name} />
          <Name>{name}</Name>
        </Checkbox>
      </Container>
    )
  }
}

export default connect(null, { fixtureType })(FixtureType);
