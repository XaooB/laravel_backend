import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Image = styled.img`
  height:60px;
`

const Logo = () => {
  return (
    <Link to='/'>
      <Image src='./assets/svg/logo.svg' title='real madrid' alt='real madrids logo' />
    </Link>
  )
}

export default Logo;
