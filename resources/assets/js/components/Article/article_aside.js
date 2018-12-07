import React from 'react';
import styled from 'styled-components';
import AsideList from './article_aside_list';
import Button from '../Reusable/button';

const Wrapper = styled.aside`
  width:27%;
  padding-left:5px;
`

const Header = styled.h3`
  font-size:1.4em;
  font-family:'AvenirD';
`

const Centered = styled.div`
  display:flex;
  width:100%;
`

const Aside = props => {
  return (
    <Wrapper>
      <Header>Latest news</Header>
      <AsideList latest = {props.latest} />
      <Centered>
        <Button name='See more' fullWidth colorBlue />
      </Centered>
    </Wrapper>
  )
}

export default Aside;
