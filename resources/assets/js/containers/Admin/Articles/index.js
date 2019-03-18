import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Header from '../../../components/Admin/admin_header';
import Title from '../../../components/Admin/admin_pageTitle';
import ArticleContent from '../../../components/Admin/article_content';
import Navigation from '../../../components/Admin/admin_navigation';
import { Helmet } from 'react-helmet';

class AdminArticles extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Artykuły - Panel Administracyjny</title>
        </Helmet>
        <Title title='Artykuły' />
        <ArticleContent />
      </Fragment>
    )
  }
}

export default AdminArticles;
