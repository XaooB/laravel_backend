import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Header from '../../../components/Admin/admin_header';
import Content from '../../../components/Admin/admin_content';
import { Helmet } from 'react-helmet';
import Navigation from '../../../components/Admin/admin_navigation';

class AdminPlayers extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Zawodnicy - Panel Administracyjny</title>
        </Helmet>
        <Title title='Zawodnicy' />
        <Content title='Zawodnicy' />
      </Fragment>
    )
  }
}

export default AdminPlayers;
