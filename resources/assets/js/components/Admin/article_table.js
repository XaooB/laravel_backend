import React, { Component } from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import ActionButton from './article_action';

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
      articles: []
    }
  }

  async componentDidMount() {
    const articles = await API.get('articles_latest/10');
    this.setState({
      articles
    });
  }

  render() {
    const { articles } = this.state;
    return (
        articles.length
        ? (
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
                        <ActionButton name='edit' />
                        <ActionButton />
                      </Field>
                    </Row>
                    );
                  })
                }
            </tbody>
          </Table>
      ) : (
        <MiniLoader />
      )
    );
  };
};

export default ArticleTable;
