import React from 'react';
import styled from 'styled-components';
import createLink from '../../helpers/createLink';
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
`

const Span = styled.span`
  border-bottom:0px solid #00529f;
  transition: border .15s;
`

const LinkTo = styled(Link)`
  color:inherit;
  position:relative;
  &:hover ${Span} {
    color:#ee324e;
  }
`

const AsideItem = props => {
  const { image, title, category, idarticle } = props.item,
          link = createLink(props.item);

  return (
    <ListItem>
      <Title>
        <LinkTo to={link}>
          <Span>{title}</Span>
        </LinkTo>
      </Title>
    </ListItem>
  )
}

export default AsideItem;
