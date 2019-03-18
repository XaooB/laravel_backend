import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import AsideList from './article_aside_list';
import Button from '../Reusable/button';

const Wrapper = styled.aside`
  width:27%;
  padding-left:5px;
  margin-bottom:50px;
  @media only screen and (max-width: 900px) {
    display:none;
  }
`;

const Header = styled.h3`
  font-size:1.4em;
  font-family:'SSPB';
`;

const Centered = styled.div`
  display:flex;
  width:100%;
`;

const Aside = props => (
  <Wrapper>
    <Header>Ostatnio dodane</Header>
    <AsideList latest={props.latest} />
    <Centered>
      <Button
        name="Zobacz więcej"
        fullWidth
        colorBlue
        onClick={ () => { props.history.push('/app/news')} }
      />
    </Centered>
  </Wrapper>
);

export default withRouter(Aside);
