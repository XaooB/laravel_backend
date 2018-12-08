import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Details = styled.div`
  display:flex;
  font-family:'SSPB';
  align-items: center;
  padding:8px;
  justify-content: center;
  flex:1;
  font-size:1.875em;
  background: #00529f;
`

const CheckMore = props => {
  return (
    <Details>
      <Link to={props.to}>
        {props.children}
      </Link>
    </Details>
  )
}

export default CheckMore;
