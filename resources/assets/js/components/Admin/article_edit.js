import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Logo from '../Reusable/logo';
import Header from './admin_header';
import Title from './admin_pageTitle';
import ArticleEditForm from './article_edit_form';
import Navigation from './admin_navigation';
import { connect } from 'react-redux';

class ArticleEdit extends Component {
  render() {
    const { articleToEdit } = this.props.admin;

    console.log(this.props.admin);
    console.log(articleToEdit);

    return (
      <Fragment>
        <Title title='Artykuły • Edytuj' />
        <ArticleEditForm label='Edytowanie artykułu' articleToEdit={ articleToEdit } />
      </Fragment>
    )
  }
}

const mapStateToProps = ({admin}) => ({admin});

export default connect(mapStateToProps)(ArticleEdit);
