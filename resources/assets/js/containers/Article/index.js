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
      article: null
    }
  }

  async componentDidMount() {
    await this.setState({
      articleID: this.props.match.params.id
    })
    const article = await API.get(`articles_show_article/${Number(this.state.articleID)}`);
    this.setState({ article: article[0]});
    this.setState({loadingStatus: false})
  }

  render() {
    if(this.state.loadingStatus) return <Loader />
    const { image } = this.state.article;
    return (
        <Main>
          <ArticleImage image = {image} />
          <Container>
            <Article article = {this.state.article} />
            <Aside />
          </Container>
        </Main>
    )
  }
}

export default SingleArticle;
