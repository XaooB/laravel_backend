import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import MiniLoader from '../../components/Reusable/mini_loader';
import ChooseFixture from '../../components/Schedule/choose_fixtures';
import Footer from '../../components/Reusable/footer'
import { Helmet } from 'react-helmet';
import ScheduleList from '../../components/Schedule/schedule_list';
import { connect } from 'react-redux';
import { fetchSchedule } from '../../actions/';

const Main = styled.main`
  display:flex;
  padding:0 10px;
  flex-flow:column;
  position:relative;
  color:#1e1e1e;
  max-width:1300px;
  margin-left:auto;
  margin-right:auto;
  margin-top:20px;
  margin-bottom:100px;
`

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: []
    }
  }

  async componentDidMount() {
    window.scrollTo(0,0);
    await this.props.fetchSchedule();
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Terminarz - portal-wertykalny</title>
        </Helmet>
        <Main>
          <ChooseFixture />
          <ScheduleList />
        </Main>
        <Footer />
      </Fragment>
    )
  }
}

export default connect(null, { fetchSchedule })(Schedule);
