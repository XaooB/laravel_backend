import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Article = styled.article`
  position:relative;
  width:100%;
  max-height:500px;
`

const Image = styled.img`
  width:100%;
`

const ImageWrapper = styled.figure`
  max-height: 500px;
  overflow:hidden;
  position:relative;
`

const Category = styled.span`
  text-transform: uppercase;
  color:#FEBE10;
  display:none;
  font-weight:bold;
  font-family:'Arial';
  position:relative;
  &:before {
    transition: width .6s;
    transition-timing-function: cubic-bezier(.24,.11,.43,1.46);
    content:'';
    position:absolute;
    width:0;
    height:3px;
    background:#FEBE10;
    left:101px;
    top:9px;
  }
  @media (min-width: 640px) {
    display:block;
    font-size:.85em;
  }
`

const Title = styled.h2`
  font-family: 'Bebas';
  letter-spacing:1.5px;
  font-size:1.4em;
  line-height: 1em;
  color:#ffffff;
  @media (min-width: 640px) {
    line-height: 1.2em;
    font-size: 2.6em;
  }
`

const LinkTo = styled(Link)`
  position:absolute;
  left:43%
  transform: translateX(-50%);
  bottom:10px;
  font-size:1.1em;
  width:calc(100% - 100px);
  max-width:550px;
  color:inherit;
  &:hover ${Category} {
    &:before {
      width:calc(100% - 101px);
    }
  }
  @media (min-width: 640px) {
    left:35%;
    width:auto;
    font-size:1em;
    bottom:40px;
  }
`

const BlackOverlay = styled.div`
  position:absolute;
  background: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.75) 65%);
  padding-top:70px;
  padding-bottom:40px;
  width:100%;
  bottom:0;
  left:0;
  @media (min-width: 640px) {
    padding-top:250px;
    padding-bottom:50px;
  }
`

const MainArticle = props => {
  const { image, category, idarticle,  title } = props.mainArticle[0],
          link = `/app/news/${category.replace(/ /g,'-')}/${idarticle}/${title.replace(/ /g,'-').toLowerCase()}`;

  return (
    <Article>
      <ImageWrapper>
        <Image src={image}  title={title} alt={title} />
      </ImageWrapper>
      <BlackOverlay>
        <LinkTo to={link}>
          <Category>{category}</Category>
          <Title>{title}</Title>
        </LinkTo>
      </BlackOverlay>
    </Article>
  )
}

export default MainArticle;
