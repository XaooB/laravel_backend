import React, { Component, Fragment } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Home from '../containers/Home';
import Live from '../containers/Live';
import Search from '../containers/Search';
import News from '../containers/News';
import Schedule from '../containers/Schedule';
import SingleArticle from '../containers/Article';
import NotAllowed from './Reusable/not_allowed';
import AdminDashboard from '../containers/Admin/Dashboard';
import AdminArticles from '../containers/Admin/Articles';
import AdminPolls from '../containers/Admin/Polls';
import AdminUsers from '../containers/Admin/Users';
import AdminComments from '../containers/Admin/Comments';
import AdminPlayers from '../containers/Admin/Players';
import ArticleAddNew from './Admin/article_addNew';
import ArticleEdit from './Admin/article_edit';
import AdminLogo from './Reusable/logo_admin';
import AdminNavigation from './Admin/admin_navigation';
import AdminHeader from './Admin/admin_header';
import Header from './Reusable/header';
import PrivateRoute from './Admin/private_route';
import NotFound from './404';
import { fetchUser } from '../actions';

const Container = styled.div`
  max-width: 1300px;
  margin:0 auto;
`

const Wrapper = styled.div`
  display:flex;
  justify-content: space-between;
  flex-flow:row nowrap;
  min-height:100%;
  color:#1c232e;
  background:#F3F4F8;
`

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
    <Router>
      <Fragment>
      <Switch>
        <Route
          path="/admin"
          render={({ match: { url }}) => (
            <Fragment>
              <Wrapper>
                <div>
                  <AdminLogo />
                  <AdminNavigation />
                </div>
                <div style={{ width:'100%' }}>
                  <AdminHeader />
                  <Switch>
                    <PrivateRoute path={`${url}/dashboard`} component={ AdminDashboard } />
                    <PrivateRoute path={`${url}/articles/edit/:id`} component={ ArticleEdit } />
                    <PrivateRoute path={`${url}/articles/add`} component={ ArticleAddNew } />
                    <PrivateRoute path={`${url}/articles`}  component={ AdminArticles } />
                    <PrivateRoute path={`${url}/users`}  component={ AdminUsers } />
                    <PrivateRoute path={`${url}/comments`}  component={ AdminComments } />
                    <PrivateRoute path={`${url}/polls`}  component={ AdminPolls } />
                    <PrivateRoute path={`${url}/players`}  component={ AdminPlayers } />
                  </Switch>
                </div>
              </Wrapper>
            </Fragment>
          )}
        />
        <Route
          path="/app"
          render={({ match: { url }}) => (
            <Fragment>
              <Header />
              <Switch>
                <Route exact path={`${url}/`} component={ Home } />
                <Route path={`${url}/news/:category/:id/:title`} component={ SingleArticle } />
                <Route path={`${url}/news/:category`} component={ News } />
                <Route path={`${url}/news`} component={ News } />
                <Route path={`${url}/live`} component={ Live } />
                <Route path={`${url}/search/:keyword`} component={ Search } />
                <Route path={`${url}/schedule`} component={ Schedule } />
                <Route path={`${url}/unauthorized`} component={ NotAllowed } />
                <Route path='*' component={ NotFound } />
              </Switch>
            </Fragment>
          )}
        />
        </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default connect(null, {fetchUser})(App);
