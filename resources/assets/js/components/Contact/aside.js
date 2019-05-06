import React from 'react';
import styled from 'styled-components';
import { FaPhone, FaUser } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";

const Container = styled.aside`
  flex:1 1 100px;
  display:flex;
  align-self: flex-start;
  flex-flow:row wrap;
  order:1;
  margin-bottom:20px;
  @media (min-width: 640px) {
    order:2;
    margin-bottom:0;
    margin-left:30px;
  }
`

const Wrapper = styled.div`
  display:flex;
  flex-flow: row wrap;
  align-items:center;
  margin-top:8px;
  font-size:.85em;
  letter-spacing:.5px;
`

const Element = styled.div`
  flex:1;
  margin:0 5px;
  &:not(:last-child) {
    margin-bottom:30px;
  }
`

const Text = styled.p`
  flex:1 1 100%;
  display:flex;
  &:not(:last-child) {
    margin-bottom:4px;
  }
  svg {
    margin-right:5px;
  }
`

const Name = styled.p`
  font-family: 'AvenirLTB';
  font-size:.95em;
  text-transform: uppercase;
`

const Number = styled.span`
  display:inline-block;
`

const ContactData = props => {
  return (
    <Container>
      <Element>
        <Name>Redakcja</Name>
        <Wrapper>
          <Text>
            <FaUser />
            <Number>Lorek Bartosz</Number>
          </Text>
          <Text>
            <FaPhone />
            <Number>+48 123 456 789</Number>
          </Text>
          <Text>
            <TiMessages />
            <Number>example@mail.com</Number>
          </Text>
        </Wrapper>
      </Element>
      <Element>
        <Name>Reklama</Name>
        <Wrapper>
          <Text>
            <FaUser />
            <Number>Lorek Bartosz</Number>
          </Text>
          <Text>
            <FaPhone />
            <Number>+48 123 456 789</Number>
          </Text>
          <Text>
            <TiMessages /> example@mail.com
          </Text>
        </Wrapper>
      </Element>
      <Element>
        <Name>Praca</Name>
        <Wrapper>
          <Text>
            <FaUser />
            <Number>Lorek Bartosz</Number>
          </Text>
          <Text>
            <FaPhone />
            <Number>+48 123 456 789</Number>
          </Text>
          <Text>
            <TiMessages /> example@mail.com
          </Text>
        </Wrapper>
      </Element>
    </Container>
  )
}

export default ContactData;
