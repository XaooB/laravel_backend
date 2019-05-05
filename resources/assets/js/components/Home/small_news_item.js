import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dateConverter from '../../helpers/dateConverter';
import createLink from '../../helpers/createLink';

const Article = styled.article`
  display:flex;
  border-left:3px solid #FEBE10;
  margin:10px;
  min-height:80px;
  align-self: flex-start;
  flex:1 1 330px;
  cursor:pointer;
  transition: all .2s ease-in-out;
  &:hover {
    transform:scale(1.03);
  }
`

const LinkTo = styled(Link)`
  display:block;
  color:#1e1e1e;
  display:flex;
  flex-flow:row nowrap;
  justify-content:flex-start;
  text-transform:uppercase;
`

const ImageWrapper = styled.figure`
  display:none;
  height:80px;
  margin: 0 5px;
  min-width:100px;
  max-width:100px;
  align-items:center;
  overflow:hidden;
  justify-content:center;
  @media (min-width: 480px) {
    display:flex;
  }
`

const Image = styled.img`
  height:80px;
`

const Header = styled.header`
  margin-left:6px;
  display:flex;
  font-family:'AvenirLTR';
  justify-content:space-between;
  flex-flow:column wrap;
`

const Date = styled.span`
  display:block;
  font-size:.8em;
`

const Wrapper = styled.div`
  line-height:1.3;
`

const Title = styled.h4`
  font-size:1em;
  font-family:'AvenirLTB';
`

const Category = styled.footer`
  font-size:.7em;
  line-height:1;
  margin-top:4px;
`

const SmallNewsItem = props => {
  const { category, title, create_date, idarticle, image } = props.article;
  const link = createLink(props.article);

  return (
    <Article>
      <LinkTo to={link}>
        <ImageWrapper>
          <Image src={image} />
        </ImageWrapper>
        <Header>
          <Wrapper>
            <Date>{create_date}</Date>
            <Title>{title}</Title>
          </Wrapper>
          <Category>{category}</Category>
        </Header>
      </LinkTo>
    </Article>
  )
}

export default SmallNewsItem;
