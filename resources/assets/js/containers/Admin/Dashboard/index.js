import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Header from '../../../components/Admin/admin_header';
import Content from '../../../components/Admin/admin_content';
import Title from '../../../components/Admin/admin_pageTitle';
import Navigation from '../../../components/Admin/admin_navigation';
import { Helmet } from 'react-helmet';
import MiniLoader from '../../../components/Reusable/mini_loader';

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingStatus: true,
      articlesStats: {},
      usersStats: {},
      commentsStats: {},
      analyticsStats: {},
      categories: []
    }
  }
  async componentDidMount() {
    const { fetchingStatus } = this.state;
    const requestArticleStats = await fetch('/api/articles_panel/7');
    const requestUsersStats = await fetch('/api/users_panel/7');
    const requestCommentsStats = await fetch('/api/comments_panel/7');
    const requestAnalyticsStats = await fetch('/api/analytics_panel/6');

    const articlesStats = await requestArticleStats.json();
    const usersStats = await requestUsersStats.json();
    const commentsStats = await requestCommentsStats.json();
    const analyticsStats = await requestAnalyticsStats.json();

    this.setState({
      articlesStats,
      usersStats,
      commentsStats,
      analyticsStats,
      fetchingStatus: !fetchingStatus,
    });
  }

  render() {
    const { fetchingStatus, articlesStats, usersStats, commentsStats, analyticsStats } = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>Dashboard - Panel Administracyjny</title>
        </Helmet>
        <Title title='Dashboard' />
        {
          !fetchingStatus ?
          (
            <Content
              uniqueVisits={analyticsStats}
              articles={articlesStats}
              users={usersStats}
              comments={commentsStats}
            />
          ) : (
            <MiniLoader margin={30} />
          )
        }
      </Fragment>
    )
  }
}

export default AdminPanel;
