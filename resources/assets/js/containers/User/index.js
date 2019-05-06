import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Wrapper from '../../components/Reusable/wrapper';
import Footer from '../../components/Reusable/footer';
import UserActivity from '../../components/User/user_activity';
import UserSettings from '../../components/User/user_settings';
import { Helmet } from 'react-helmet';

const Main = styled.main`
  max-width: 1300px;
  color:#1e1e1e;
  padding:0 5px;
  margin:40px auto;
  padding-right:45px;
  @media (min-width: 640px) {
    padding-right:0;
  }
`

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Profil użytkownika test administrator - portal-wertykalny.herokuapp.com</title>
        </Helmet>
        <Main>
          <Wrapper>
            <UserActivity />
            <UserSettings />
          </Wrapper>
        </Main>
        <Footer />
      </Fragment>
    )
  }
}

export default User;
