import React from 'react';
import styled from 'styled-components';
import TagsList from './tags_list';
import MiniLoader from '../Reusable/mini_loader';
import Title from '../Schedule/schedule_title';

const Container = styled.section`
  width:27%;
  padding-left:20px;
`

const Information = styled.p`
  padding:10px 0;
`

const Tags = props => {
  const { articles, status } = props;

  return (
    <Container>
      <Title>Tagi</Title>
      {
        !status ?
        articles.length ?
        (
          <TagsList articles={ articles } />
        ) : (
            <Information>Brak wyników</Information>
        ) : (
          <MiniLoader margin={20} />
        )
      }
    </Container>
  )
}

export default Tags;
