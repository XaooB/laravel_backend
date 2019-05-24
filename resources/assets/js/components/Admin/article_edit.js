import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Logo from '../Reusable/logo';
import Header from './admin_header';
import Title from './admin_pageTitle';
import ArticleEditForm from './article_edit_form';
import Navigation from './admin_navigation';
import { connect } from 'react-redux';

class ArticleEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNotificationModal: false
    }
  }

  render() {
    const { articleToEdit } = this.props.admin;

    return (
      <Fragment>
        <Title title='Artykuły • Edytuj' />
        <ArticleEditForm
          label='Edytowanie artykułu'
          articleToEdit={ articleToEdit }
          toggleModalFunction={ () => this.setState({showNotificationModal: true}) }
        />
      </Fragment>
    )
  }
}

const mapStateToProps = ({admin}) => ({admin});

export default connect(mapStateToProps)(ArticleEdit);
