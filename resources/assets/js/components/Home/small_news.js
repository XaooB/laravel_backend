import React from 'react';
import styled from 'styled-components';
import SmallNewsItem from './small_news_item';

const Container = styled.section`
  display:flex;
  flex-flow:row wrap;
  justify-content:space-between;
`

const SmallNews = props => {
  const { smallNews } = props;

  return (
    <Container>
      {
        smallNews.map( item => <SmallNewsItem article={item} key={item.idarticle} /> )
      }
    </Container>
  )
}

export default SmallNews;
