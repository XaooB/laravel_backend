import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  flex:1;
  padding-right:5px;
`

const Span = styled.div`
 position:sticky;
 top:50%;
 transform:translateY(-50%);
 margin-top:35px;
 margin-bottom:-10px;
`

const CommentFeatures = props => {
  return (
    <Wrapper>
      <Span>sorting etc..</Span>
    </Wrapper>
  )
}

export default CommentFeatures;
