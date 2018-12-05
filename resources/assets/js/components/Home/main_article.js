import React from 'react';
import styled from 'styled-components';
import Aside from '../../components/Home/aside';
import { Link } from 'react-router-dom';

const Article = styled.article`
  position:relative;
  top:-130px;
  padding:0 10px;
  width:100%;
  max-height:700px;
`

//DOES NOT WORK PROPERLY - THERES NOT BLUE OVERLAY
const Image = styled.img`
  width:100%;
`

const ImageWrapper = styled.figure`
  max-height: 700px;
  overflow:hidden;
  position:relative;
  &:before {
    position:absolute;
    content: '';
    background: #00529f;
    width:100%;
    mix-blend-mode: hard-light;
    opacity:.6;
    height:100%;
    left:0;
    top:0;
  }
`

const HeaderWrapper = styled.div`
  margin-left: 75px;
  top:50%;
  transform: translateY(-50%);
  display:flex;
  flex-flow:column nowrap;
  flex-direction:column;
  max-width:520px;
  position:absolute;
`

const Category = styled.span`
  font-family:'AvenirB';
  font-size:1.1em;
  text-transform: uppercase;
  color:#febe10;
`

const Title = styled.h2`
  font-size: 2.2em;
  font-family: 'AvenirB';
  letter-spacing:1.5px;
  line-height: 1.2em;
  padding:8px 0;
`

const Hover = styled.span`
  border-bottom:0px solid #febe10;
  transition: border .15s;
`

const LinkTo = styled(Link)`
  color:inherit;
  &:hover ${Hover} {
    border-bottom:4px solid #febe10;
    transition: border .15s;
  }
`

const MainArticle = props => {
  const { image, category, title } = props.mainArticle[0];

  return (
    <Article>
      <ImageWrapper>
        <Image src={image}  alt='' />
      </ImageWrapper>
      <LinkTo to='/news/la-liga/1/Vinicius-Jr.-plays-his-first-match-in-Real-Madrid'>
        <HeaderWrapper>
          <header>
            <Category>{category}</Category>
            <Title>
              <Hover>{title}</Hover>
            </Title>
          </header>
        </HeaderWrapper>
      </LinkTo>
      <Aside data={ props.asideArticles } />
    </Article>
  )
}

export default MainArticle;
