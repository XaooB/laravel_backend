import React, { Component } from 'react';
import '../App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Home from '../containers/Home/';
import Live from '../containers/Live/';
import Header from './Reusable/header'
import Footer from './Reusable/footer'
import Topbar from './Reusable/topbar'
import SingleArticle from '../containers/Article/'
import NotFound from './404';

const Container = styled.div`
  max-width:1450px;
  margin:0 auto;
`

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
		<Topbar />
        <Header />
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/news/:category/:id/:title' component={ SingleArticle } />
            <Route path='/news' component={ Home } />
            <Route path='/live' component={ Live } />
            <Route path='*' component={ NotFound } />
          </Switch>
        <Footer />
        </Container>
      </Router>
    );
  }
}


export default App;
