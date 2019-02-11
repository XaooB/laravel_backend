import React from 'react';
import styled from 'styled-components';
import AsideList from './article_aside_list';
import Button from '../Reusable/button';

const Wrapper = styled.aside`
  width:27%;
  padding-left:5px;
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
    <Header>Latest news</Header>
    <AsideList latest={props.latest} />
    <Centered>
      <Button name="See more" fullWidth colorBlue />
    </Centered>
  </Wrapper>
);

export default Aside;
