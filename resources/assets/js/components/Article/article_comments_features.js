import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  flex:1;
  padding-right:5px;
`

const Span = styled.div`
  margin-top:5px;
  position:sticky;
  top:45%;
`

const CommentFeatures = props => {
  return (
    <Wrapper>
      <Span>sorting etc..</Span>
    </Wrapper>
  )
}

export default CommentFeatures;
