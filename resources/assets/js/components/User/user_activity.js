import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PageHeader from '../Reusable/PageHeader'
import UserActivityItem from './user_activity_item';
import MiniLoader from '../Reusable/mini_loader';
import NoUser from './no_user_info';
import { connect } from 'react-redux';

const Information = styled.p`
  margin-top:15px;
`

const Container = styled.section`
  width:100%;
  flex:1 1 580px;
  order:2;
  @media (min-width: 820px) {
    order:1;
    width:73%;
  }
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
        ? activityList.length
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
          <Fragment>
            <PageHeader>Ostatnia aktywność</PageHeader>
            <Information>Brak aktywności dla tego użytkownika.</Information>
          </Fragment>
        )
          : ''
          : <MiniLoader margin={20} />
      }
      </Container>
    )
  }
}

export default UserActivity;
