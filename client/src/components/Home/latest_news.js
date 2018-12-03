import React from 'react';
import PageHeader from '../Reusable/PageHeader';
import styled from 'styled-components';
import LatestNewsItem from './latest_news_item';

const Section = styled.section`
  width:100%;
  margin:60px 0 40px 0;
`

const Wrapper = styled.div`
  display:flex;
  flex-flow:row wrap;
  justify-content: space-between;
`

const LatestNews = props => {
  const { latestArticles } = props;

  return (
    <Section>
      <div style={{marginLeft: 10}}>
        <PageHeader title='najnowsze' />
      </div>
      <Wrapper>
        {latestArticles.map((item, key) => {
            return <LatestNewsItem key={ key } article={ item } />
        })}
      </Wrapper>
    </Section>
  )
}

export default LatestNews;
