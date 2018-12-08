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
  &:before {
    position:absolute;
    content: '';
    background: #00529f;
    width:100%;
    mix-blend-mode: hard-light;
    opacity:.5;
    height:100%;
    left:0;
    top:0;
  }
`

const HeaderWrapper = styled.div`
  left:5%;
  bottom:25%;
  display:flex;
  background: rgba(0,0,0,.6);
  padding:20px;
  flex-flow:column nowrap;
  flex-direction:column;
  max-width:550px;
  min-width:300px;
  position:absolute;
  font-family:'SSPBK';
`

const Category = styled.span`
  text-transform: uppercase;
  color:#febe10;
  font-size: 1.05em;
`

const Title = styled.h2`
  font-size: 2.1em;
  letter-spacing:1.5px;
  line-height: 1.2em;
  color:#ffffff;
  padding:8px 0;
`

const Hover = styled.span`
  border-bottom:0px solid #febe10;
  transition: border .15s;
`

const LinkTo = styled(Link)`
  color:inherit;
  &:hover ${HeaderWrapper} {
    border-left: 4px solid #febe10;
  }
`

const MainArticle = props => {
  const { image, category, idarticle,  title } = props.mainArticle[0],
          link = `/news/${category.replace(/ /g,'-')}/${idarticle}/${title.replace(/ /g,'-')}`;

  return (
    <Article>
      <ImageWrapper>
        <Image src={image}  title={title} alt={title} />
      </ImageWrapper>
      <LinkTo to={link}>
        <HeaderWrapper>
          <Category>{category}</Category>
          <Title>{title}</Title>
        </HeaderWrapper>
      </LinkTo>
    </Article>
  )
}

export default MainArticle;
