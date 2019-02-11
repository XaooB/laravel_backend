import React from 'react';
import styled from 'styled-components';

const Text = styled.span`
  padding:20px;
  display:block;
  margin-top:10px;
  letter-spacing:.5px;
  text-transform: uppercase;
`

const Title = props => <Text>{props.children}</Text>;

export default Title;
