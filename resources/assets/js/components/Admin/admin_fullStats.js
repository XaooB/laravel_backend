import React from 'react';
import styled from 'styled-components';
import FullStatsItem from './admin_fullStats_item';

const FlexWrapper = styled.div`
  display:flex;
  align-self:flex-start;
  flex:1.75;
  justify-content:space-between;
  flex-flow: row wrap;
`

const FullStats = props => {
  const { totalUsers, totalArticles, totalComments } = props;
  return (
    <FlexWrapper>
      <FullStatsItem amount={ totalUsers } name='użytkowników' />
      <FullStatsItem amount={ totalArticles } name='artykułów' />
      <FullStatsItem amount={ totalComments } name='komentarzy' />
    </FlexWrapper>
  )
}

export default FullStats;
