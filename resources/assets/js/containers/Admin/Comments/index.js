import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Header from '../../../components/Admin/admin_header';
import Title from '../../../components/Admin/admin_pageTitle';
import CommentsContent from '../../../components/Admin/comments_content';
import Navigation from '../../../components/Admin/admin_navigation';
import { Helmet } from 'react-helmet';

class CommentsPanel extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Komentarze - Panel Administracyjny</title>
        </Helmet>
        <Title title='Komentarze' />
        <CommentsContent />
      </Fragment>
    )
  }
}

export default CommentsPanel;
