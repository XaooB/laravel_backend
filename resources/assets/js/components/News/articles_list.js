import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNews } from '../../actions/'
import styled from 'styled-components';
import Article from '../News/articles_list_item';
import MiniLoader from '../Reusable/mini_loader';

const Section = styled.section`
  width:100%;
  display:flex;
  flex-flow:row wrap;
  justify-content: space-between;
  @media (min-width: 480px) {
    margin-top:20px;
  }
  article {
    cursor:pointer;
    transition: all .2s ease-in-out;
    &:hover {
      transform:scale(1.03);
    }
  }
`

class ArticleList extends Component {
  async componentDidMount() {
    const { selectedCategoriesByUser } = this.props.article;
    const categoriesID = this.props.article.selectedCategoriesByUser.map(({id}) => id);
    await this.props.fetchNews(categoriesID);
  }
  render() {
    const { newsByCategory } = this.props.article;

    return (
      <Section>
        {
          newsByCategory.length ?
          (
            newsByCategory.map(item => <Article key={ item.idarticle } article={item} />)
          ) : (
            <MiniLoader margin={20} />
          )
        }
      </Section>
    )
  }
}

const mapStateToProps = ({article}) => ({article});
export default connect(mapStateToProps, { fetchNews })(ArticleList);
