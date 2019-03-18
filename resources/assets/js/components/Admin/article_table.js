import React, { Component } from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import { Link } from 'react-router-dom';
import ActionButton from './article_action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { StoreAdminArticleToEdit, fetchAdminArticles } from '../../actions'
import {
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';

import Toast from '../Reusable/Toast';
import { API } from '../../helpers/api';

const Table = styled.table`
  width:100%;
  text-align:left;
  border-collapse: collapse;
`

const Title = styled.th`
  padding:12px 5px;
  border-top-left-radius:3px;
  border-top-right-radius:3px;
  border:1px solid #F3F4F8;
  font-family:'SSPB';
`

const Field = styled.td`
  padding:14px 5px;
`

const Row = styled.tr`
  &:nth-child(odd) {
    ${Field} {
      background:#F3F4F8;
    }
  }
`


class ArticleTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      showToast: false
    }
  }

  async handleDelete(id) {
    try {
      const request = await axios.delete(`/api/articles/${id}`)
      this.showToast();

      //akcja ktora ponownie pobiera artykuły

    } catch (e) {
      throw new Error(e);
    }
  }

  async componentDidMount() {
    await this.props.fetchAdminArticles();
    this.setState({
      articles: this.props.admin.ownArticles
    })
  }

  async componentDidUpdate(prevProps) {
    const currentProps = this.props;

    if(prevProps.admin.ownArticles.length !== currentProps.admin.ownArticles.length)
      this.setState({
        articles: currentProps.admin.ownArticles
      })
  }

  showToast () {
    this.setState({
      showToast: true
    }, () => {
      setTimeout(() => {
        this.setState({ showToast: false });
        this.props.fetchAdminArticles();
      }
    ,2000)
    })
  }

  render() {
    const { showToast, articles } = this.state;

    return (
      articles.length
      ? (
        <div>
        <Table>
          <thead>
            <tr>
              <Title>Data</Title>
              <Title>Status</Title>
              <Title>Tytuł</Title>
              <Title>Głowny</Title>
              <Title>Kategoria</Title>
              <Title>Akcje</Title>
            </tr>
          </thead>
          <tbody>
            {
            articles.map((item) => {
              return (
                  <Row key={item.idarticle}>
                    <Field>{item.create_date}</Field>
                    <Field>DODANY</Field>
                    <Field>{item.title}</Field>
                    <Field>
                      <input type='checkbox' />
                    </Field>
                    <Field>{item.category}</Field>
                    <Field>
                    <Link to={`/admin/articles/edit/${item.idarticle}`} style={{display:'inline-block'}}>
                      <ActionButton name='Edytuj' icon={ <MdEdit /> } onClick={() => { this.props.StoreAdminArticleToEdit(item) }} />
                    </Link>
                      <ActionButton name='Usuń' onClick={() => this.handleDelete(item.idarticle)} icon={ <MdDeleteForever /> } />
                    </Field>
                  </Row>
                  );
                })
              }
          </tbody>
        </Table>
        <Toast message='Artykuł został usunięty' visible={showToast} />
        </div>
    ) : ''
    );
  };
};

const mapStateToProps = ({admin}) => ({admin});
export default withRouter(connect(mapStateToProps, { StoreAdminArticleToEdit, fetchAdminArticles })(ArticleTable));
