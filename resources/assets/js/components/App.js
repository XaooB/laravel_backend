import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Home from '../containers/Home';
import Live from '../containers/Live';
import SingleArticle from '../containers/Article';
import NotAllowed from './Reusable/not_allowed';
import AdminDashboard from '../containers/Admin/Dashboard';
import AdminArticles from '../containers/Admin/Articles';
import AdminPolls from '../containers/Admin/Polls';
import AdminUsers from '../containers/Admin/Users';
import AdminComments from '../containers/Admin/Comments';
import AdminPlayers from '../containers/Admin/Players';
import Header from './Reusable/header';
import PrivateRoute from './Admin/private_route';
import NotFound from './404';
import { fetchUser } from '../actions';

const Container = styled.div`
  max-width:1300px;
  margin:0 auto;
`

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <Container>
        <Header/>
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/news/:category/:id/:title' component={ SingleArticle } />
            <Route path='/news' component={ Home } />
            <Route path='/live' component={ Live } />
            <Route path='/not_allowed' component={ NotAllowed } />
            <PrivateRoute path='/admin/dashboard' component={ AdminDashboard } />
            <Route path='/admin/articles' component={ AdminArticles } />
            <Route path='/admin/users' component={ AdminUsers } />
            <Route path='/admin/comments' component={ AdminComments } />
            <Route path='/admin/polls' component={ AdminPolls } />
            <Route path='/admin/players' component={ AdminPlayers } />
            <Route path='*' component={ NotFound } />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default connect(null, {fetchUser})(App);
