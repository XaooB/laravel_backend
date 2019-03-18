import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.figure`
  display:none;
  justify-content:center;
  min-width:55px;
  min-height:55px;
  max-width:55px;
  max-height:55px;
  margin-right:10px;
  overflow:hidden;
  align-self:flex-start;
  border-radius:100%;
  @media (min-width: 640px) {
    display:flex;
  }
`

const Image = styled.img`
  height:55px;
`

const User = props => {
  const {image} = props.user;

  return (
    <ImageContainer>
      <Image src={image} title='' alt='' />
    </ImageContainer>
  )
}

export default User;
