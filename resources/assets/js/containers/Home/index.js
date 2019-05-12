import React, { Component } from 'react';
import MainArticle from '../../components/Home/main_article';
import LatestResult from '../../components/Home/latest_result';
import LeagueTable from '../../components/Home/league_table';
import ScorersTable from '../../components/Home/scorers_table';
import SmallNews from '../../components/Home/small_news';
import Schedule from '../../components/Home/fixtures_upcoming';
import LatestNews from '../../components/Home/latest_news';
import StrawPoll from '../../components/Home/Poll';
import NextMatch from '../../components/Home/next_match_newVersion';
import Injuries from '../../components/Home/injuries';
import Footer from '../../components/Reusable/footer'
import Loader from '../../components/Reusable/loader';
import styled from 'styled-components';

//api calls
import { API } from '../../helpers/api';

const Main = styled.main`
  display:flex;
  max-width:1300px;
  margin-left: auto;
  margin-right:auto;
  flex-flow: row wrap;
  justify-content: space-between;
`

const Container = styled.div`
  width:100%;
`

const RestNewsAndPolls = styled.section`
  flex:4 1 600px;
  order:1;
`

const Polls = styled.section`
  display:flex;
  align-items: flex-start;
  flex-flow:row wrap;
  justify-content:space-between;
`

const TableAndSocial = styled.section`
  margin-top:-12px;
  flex:1 1 300px;
  order:2;
  padding:0 10px;
`

const FixturesInfo = styled.section`
  width:100%;
  margin:35px 10px 0 10px;
  display:flex;
  justify-content:space-between;
  flex-flow: row wrap;
`

class Home extends Component {
  constructor (props)
  {
	  super(props);
	  this.state = {
      loadingStatus: true,
      mainArticle: [],
      articles: [],
      schedule: [],
      leagueTable: [],
      latestResult: [],
      pollData: [],
      injuriesData: []
    };
  }

  async componentDidMount() {
    const mainArticle = await API.get('articles_latest_main/1'),
          articles = await API.get('articles_latest/24'),
          schedule = await API.get('matches_get_scheduled_matches/5'),
          leagueTable = await API.get('leaguescoreboard_get_league_scoreboard/2018-2019/PD'),
          latestResult = await API.get('matches_get_finished_match'),
          pollData = await API.get('surveysets_get_latest'),
          injuriesData = await API.get('injuriessuspensions_actual');

    this.setState({ mainArticle, articles, schedule, leagueTable, latestResult, pollData, injuriesData, loadingStatus: false });
  }

  render() {
    const { mainArticle, articles, schedule, leagueTable, latestResult, pollData, injuriesData, loadingStatus } = this.state;

    if(loadingStatus) return <Loader />
    const lastestNewsBig = articles.slice(0, 9),
          smallNews = articles.slice(9, 19),
          nextMatch = schedule[0],
          upcomingMatches = schedule.slice(1, 5);

    return (
      <Container>
        <MainArticle mainArticle={ mainArticle } />
        <Main>
          <LatestNews latestArticles={lastestNewsBig} />
          <NextMatch data={nextMatch} />
          <RestNewsAndPolls>
            <SmallNews smallNews={smallNews} />
            <Polls>
              <LeagueTable leagueTable={leagueTable} />
              <ScorersTable />
            </Polls>
          </RestNewsAndPolls>
          <TableAndSocial>
            <StrawPoll pollData={pollData} />
            <Injuries injuriesData={injuriesData} />
          </TableAndSocial>
        </Main>
        <Footer />
      </Container>
    )
  }
}

export default Home;
