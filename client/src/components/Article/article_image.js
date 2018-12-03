import React from 'react';
import styled from 'styled-components';

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
    opacity:.6;
    height:100%;
    left:0;
    top:0;
  }
`

const Image = styled.img`
  width:100%;
`

const ArticleImage = props => {
  return (
      <ImageWrapper>
        <Image src='https://i.imgur.com/oQbTVhy.jpg'  alt='Vinicius Jr' />
      </ImageWrapper>
  )
}

export default ArticleImage;
