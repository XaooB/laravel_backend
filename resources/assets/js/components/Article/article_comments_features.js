import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  flex:1;
  padding-right:5px;
  @media only screen and (max-width: 480px) {
    display:none;
  }
`

const Span = styled.div`
  margin-top:5px;
  position:sticky;
  top:45%;
`

const CommentFeatures = props => {
  return (
    <Wrapper>
      <Span></Span>
    </Wrapper>
  )
}

export default CommentFeatures;
