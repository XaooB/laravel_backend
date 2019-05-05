import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Logo from '../Reusable/logo';
import Header from './admin_header';
import Title from './admin_pageTitle';
import AddNewArticleForm from './article_addNew_form.js';
import Navigation from './admin_navigation';
import { Helmet } from 'react-helmet';

class AdminPanel extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Dodawnie nowego artykułu - Panel Administracyjny</title>
        </Helmet>
        <Title title='Artykuły • Dodaj nowy' />
        <AddNewArticleForm label='Dodawanie artykułu'/>
      </Fragment>
    )
  }
}

export default AdminPanel;
