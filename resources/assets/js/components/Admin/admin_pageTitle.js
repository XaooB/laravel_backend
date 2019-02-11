import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left:1px;
  height:40px;
  background:white;
  padding:0 15px;
  box-shadow: 1px 1px 4px #e5e5e5;
`

const Text = styled.h4`
  font-weight:normal;
  font-family: 'SSPL';
  color:#222222;
  line-height:40px;
  font-size:.95em;
`


const PageTitle = props => <Wrapper><Text><span style={{color: '#c8c8c8'}}>Home &bull; </span>{props.title}</Text></Wrapper>

export default PageTitle;
