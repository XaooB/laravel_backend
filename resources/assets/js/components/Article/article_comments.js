import React from 'react';
import styled from 'styled-components';
import Wrapper from '../Reusable/wrapper';
import User from './article_user';
import Form from './Article_comments_form';
import CommentsList from './article_comments_list';

const Section = styled.section`
  
`

const Title = styled.h3`
  font-size:1.5em;
  font-family:'SSPB';
  margin-bottom:12px;
`

const CommentSection = props => {
  const { comments } = props;
  return (
    <Section>
      <Title>Comments</Title>
      <Wrapper>
        <User />
        <Form />
      </Wrapper>
      <CommentsList comments = {comments}/>
    </Section>
  )
};

export default CommentSection;
