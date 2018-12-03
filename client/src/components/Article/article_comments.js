import React from 'react';
import styled from 'styled-components';
import Wrapper from '../Reusable/wrapper';
import User from './article_user';
import Form from './Article_comments_form';
import CommentsList from './article_comments_list';

const Section = styled.section`
  margin-top:20px;
`

const Title = styled.h3`
  font-size:1.4em;
  font-family:'AvenirD';
  margin-bottom:12px;
`

const CommentSection = props => {
  return (
    <Section>
      <Title>Comments</Title>
      <Wrapper>
        <User />
        <Form />
      </Wrapper>
      <CommentsList />
    </Section>
  )
};

export default CommentSection;
