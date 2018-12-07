import React, { Component } from 'react';
import styled from 'styled-components';
import Article from '../../components/Article/article';
import ArticleImage from '../../components/Article/article_image';
import Aside from '../../components/Article/article_aside';
import Loader from '../../components/Reusable/loader';

//api calls
import { API } from '../../helpers/api';

const Main = styled.main`
  display:flex;
  flex-flow:column;
  position:relative;
  color:#1e1e1e;
  width:100%;
`

const Container = styled.section`
  display:flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top:40px;
  padding:0 5px;
`

class SingleArticle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loadingStatus: true,
      articleID: null,
      article: null,
      latest: [],
      neighbours: []
    }
  }

  async componentDidUpdate(prevProps) {
    window.scrollTo(0,0);

    const currentID = Number(this.props.match.params.id),
          prevID = Number(prevProps.match.params.id);

    if (currentID !== prevID) {
      const article = await API.get(`articles_show_article/${currentID}`),
            neighbours = await API.get(`articles_show_neighbours/${currentID}`);

      this.setState({article: article, neighbours})
    }
  }

  async componentDidMount() {
    window.scrollTo(0,0);

    const currentID = Number(this.props.match.params.id),
          article = await API.get(`articles_show_article/${currentID}`),
          latest = await API.get('articles_latest/10'),
          neighbours = await API.get(`articles_show_neighbours/${currentID}`);

    this.setState({article, latest, neighbours, loadingStatus: false });
  }

  render() {
    if(this.state.loadingStatus) return <Loader />
    const { image } = this.state.article;
    return (
        <Main>
          <ArticleImage article = {this.state.article} />
          <Container>
            <Article article = {this.state.article} neighbours = {this.state.neighbours} />
            <Aside latest = {this.state.latest} />
          </Container>
        </Main>
    )
  }
}

export default SingleArticle;
