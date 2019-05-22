import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Article = styled.article`
  position:relative;
  width:100%;
  max-height:500px;
  transition: all .2s ease-in-out;
  &:hover img {
    transform:scale(1.03);
`

const Image = styled.img`
transition: all .2s ease-in-out;
  height:250px;
  @media (min-width: 480px) {
    width:100%;
    height:100%;
  }
`

const ImageWrapper = styled.figure`
  height: 250px
  display:flex;
  justify-content:center;
  flex-flow:row wrap;
  overflow:hidden;
  @media (min-width: 480px) {
    max-height: 500px;
    height:auto;
    font-size:2.6em;
  }
`

const Category = styled.span`
  text-transform: uppercase;
  color:#FEBE10;
  display:none;
  font-weight:bold;
  font-family:'Arial';
  @media (min-width: 640px) {
    display:block;
    font-size:.85em;
  }
`

const Title = styled.h2`
  font-family: 'Bebas';
  letter-spacing:1.5px;
  font-size:1.7em;
  line-height: 1em;
  color:#ffffff;
  @media (min-width: 480px) {
    font-size: 2.2em;
  }
  @media (min-width: 640px) {
    line-height: 1.2em;
    font-size: 2.6em;
  }
`

const LinkTo = styled(Link)`
  position:absolute;
  left:43%
  transform: translateX(-50%);
  bottom:20px;
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
