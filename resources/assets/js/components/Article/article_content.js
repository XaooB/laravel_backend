import React, { Fragment } from 'react';
import styled from 'styled-components';

const Text = styled.p`
  line-height:1.5;
  font-size:.9em;
  text-align: justify;
  @media (min-width: 640px) {
    font-size:1.1em;
  }
`

const Content = props => {
  const { content } = props.article;
  return (
    <Fragment>
      <Text>{content}</Text>
    </Fragment>
  )
}

export default Content;
