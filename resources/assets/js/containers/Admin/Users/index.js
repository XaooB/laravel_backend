import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Header from '../../../components/Admin/admin_header';
import { Helmet } from 'react-helmet';
import Title from '../../../components/Admin/admin_pageTitle';
import UsersContent from '../../../components/Admin/users_content';
import Navigation from '../../../components/Admin/admin_navigation';

class CommentsPanel extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Użytkownicy - Panel Administracyjny</title>
        </Helmet>
        <Title title='Użytkownicy' />
        <UsersContent />
      </Fragment>
    )
  }
}

export default CommentsPanel;
