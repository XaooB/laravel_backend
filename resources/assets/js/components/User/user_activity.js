import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PageHeader from '../Reusable/PageHeader'
import UserActivityItem from './user_activity_item';
import MiniLoader from '../Reusable/mini_loader';
import NoUser from './no_user_info';
import { connect } from 'react-redux';

const Container = styled.section`
  width:100%;
  flex:1 1 580px;
  order:2;
  @media (min-width: 820px) {
    order:1;
    width:73%;
  }
`

const Info = styled.p`
  margin-top:16px;
`


class UserActivity extends Component {
  render() {
    const { status, activity } = this.props;
    const activityList = activity.latestComments === undefined ? null : [...activity.latestComments, ...activity.likedArticles].sort((b, a) => new Date(a.create_date).getTime() - new Date(b.create_date).getTime());
    const user = activity.user === undefined ? null : [activity.user];

    return (
      <Container>
      {
        !status
        ? activity.user !== null
        ? (
          <Fragment>
            <PageHeader>Ostatnia aktywność</PageHeader>
            <div>
              {
                activityList.map(item => {
                 return <UserActivityItem
                          key={ item.idcomment ? item.idcomment : item.idarticle }
                          item={ item }
                          user={ user } />
                })
              }
            </div>
          </Fragment>
        ) : (
          ''
        ) : (
          <MiniLoader margin={20} />
        )
      }
      </Container>
    )
  }
}

export default UserActivity;
