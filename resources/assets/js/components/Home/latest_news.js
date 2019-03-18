import React from 'react';
import PageHeader from '../Reusable/PageHeader';
import styled from 'styled-components';
import LatestNewsItem from './latest_news_item';
import LatestNewsBig from './latest_news_big_image';
import LatestNewsRotated from './latest_news_rotated';

const Section = styled.section`
  width:100%;
  margin: 10px 0;
  display:flex;
  flex-flow:row wrap;
  justify-content: space-between;
  article {
    cursor:pointer;
    transition: all .2s ease-in-out;
    &:hover {
      transform:scale(1.03);
    }
  }
`

const LatestNews = props => {
  const { latestArticles } = props;

  return (
    <Section>
        {
          latestArticles.map((item, key) => {
            if(key === 1 || key === 3 || key === 5 || key === 6)
              return <LatestNewsBig key={ item.idarticle } article={ item } />
            if(key === 2 || key == 7)
              return <LatestNewsRotated key={ item.idarticle } article={ item } />
            return <LatestNewsItem key={ item.idarticle } article={ item } />
          })
        }
    </Section>
  )
}

export default LatestNews;
