import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListItem = styled.li`
  display:flex;
  flex-flow:row nowrap;
  justify-content:flex-start;
  padding:12px 0;
  &:not(:last-child) {
    border-bottom:1px solid #ededed;
  }
`

const ImageWrapper = styled.figure`
  height:70px;
  max-width:100px;
  min-width:100px;
  overflow:hidden;
  display:flex;
  justify-content:center;
`

const Image = styled.img`
  height:90px;
`

const Title = styled.h3`
  font-size:.95em;
  align-self:flex-start;
  font-weight:lighter;
  padding:0 15px;
`

const Span = styled.span`
  border-bottom:0px solid #00529f;
  transition: border .15s;
`

const LinkTo = styled(Link)`
  color:inherit;
  position:relative;
  &:hover ${Span} {
    border-bottom:3px solid #00529f;
    transition: border .15s;
  }
`

const AsideItem = props => {
  return (
    <ListItem>
      <ImageWrapper>
        <Image src='https://i.imgur.com/oQbTVhy.jpg' alt='comment' title='title' />
      </ImageWrapper>
      <Title>
        <LinkTo to='/news/costam'>
          <Span>Vinicius Jr. plays his first match in Real Madrid</Span>
        </LinkTo>
      </Title>
    </ListItem>
  )
}

export default AsideItem;
