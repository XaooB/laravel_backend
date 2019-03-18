import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.figure`
  max-height: 500px;
  overflow:hidden;
`

const Image = styled.img`
  width:100%;
`

const ArticleImage = props => {
  const { image, title } = props.article;
  return (
      <ImageWrapper>
        <Image src={image} title={title} alt={title}  />
      </ImageWrapper>
  )
}

export default ArticleImage;
