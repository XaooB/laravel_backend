import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.figure`
  display:flex;
  justify-content:center;
  min-width:65px;
  min-height:65px;
  max-width:65px;
  max-height:65px;
  margin-right:10px;
  overflow:hidden;
  align-self:flex-start;
  border-radius:100%;
`

const Image = styled.img`
  height:70px;
`

const User = props => {
  const {image} = props;
  return (
    <ImageContainer>
      <Image src={image} title='' alt='' />
    </ImageContainer>
  )
}

export default User;
