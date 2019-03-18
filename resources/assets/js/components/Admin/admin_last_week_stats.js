import React, { Component } from 'react';
import styled from 'styled-components';
import Title from './admin_content_title';
import Visits from './admin_visits';
import LastWeekUserStatsItem from './admin_last_week_userStats_item';
import LastWeekArticleStatsItem from './admin_last_week_articleStats_item';
import LastWeekCommentsStatsItem from './admin_last_week_commentsStats_item';

const FlexWrapper = styled.div`
  display:flex;
  justify-content:space-between;
  flex-flow: row wrap;
  align-items:flex-start;
`

class LastWeekStats extends Component {
  render() {
    const { articles, users, comments, uniqueVisits } = this.props;

    return (
      <div>
        <Title>ostatni tydzień</Title>
        <Visits uniqueVisits={ uniqueVisits } />
        <FlexWrapper>
          <LastWeekUserStatsItem data={ users } />
          <LastWeekArticleStatsItem data={ articles } />
          <LastWeekCommentsStatsItem data={ comments } />
        </FlexWrapper>
      </div>
    )
  }
}

export default LastWeekStats;
