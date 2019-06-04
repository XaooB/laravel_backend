import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.figure`
  justify-content:center;
  min-width:45px;
  min-height:45px;
  max-width:45px;
  max-height:45px;
  margin-right:10px;
  overflow:hidden;
  align-self:flex-start;
  border-radius:100%;
  @media (min-width: 640px) {
    min-width:55px;
    min-height:55px;
    max-width:55px;
    max-height:55px;
  }
`

const Image = styled.img`
  height:55px;
`

const User = props => {
  const {image, name} = props.user;

  return (
    <ImageContainer>
      <Image src={image} title={`avatar uzytkownika ${name}`} alt={`avatar uzytkownika ${name}`} />
    </ImageContainer>
  )
}

export default User;
