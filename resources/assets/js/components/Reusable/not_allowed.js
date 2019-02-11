import React, { Fragment } from 'react';
import styled from 'styled-components';
import Footer from './footer';


const Information = styled.span`
  display:block;
  padding:35px;
  background:#fff;
  color:#333;
  text-align:center;
  font-size:1.1em;
`

const NotAllowed = props => {
  console.log(props);
  return (
    <Fragment>
      <Information>Nie masz uprawnień do przeglądania tej strony!</Information>
      <Footer />
    </Fragment>
  )
}

export default NotAllowed;
