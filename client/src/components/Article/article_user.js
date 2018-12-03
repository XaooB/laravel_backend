import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.figure`
  display:flex;
  justify-content:center;
  min-width:85px;
  min-height:85px;
  max-width:85px;
  max-height:85px;
  margin-right:10px;
  overflow:hidden;
  align-self:flex-start;
  border-radius:100%;
`

const Image = styled.img`
  height:90px;
`

const User = props => {
  return (
    <ImageContainer>
      <Image src='https://i.imgur.com/IlUh0PX.png' alt='users avatar' title='username' />
    </ImageContainer>
  )
}

export default User;
