import React, { Component } from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import ActionButton from './article_action';
import { connect } from 'react-redux';
import { searchAdminArticles } from '../../actions/';
import { Link } from 'react-router-dom';
import { MdEdit, MdBuild } from 'react-icons/md';
import { API } from '../../helpers/api';

const Table = styled.table`
  width:100%;
  text-align:left;
  table-layout: fixed;
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
  word-break: break-word;
`

const Row = styled.tr`
  ${Field} {
    &:last-child {
      max-width:230px;
    }
  }
  &:nth-child(odd) {
    ${Field} {
      background:#F3F4F8;
    }
  }
`


class UsersTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }

  componentWillUnmount() {
    this.props.searchAdminArticles('')
  }

  async componentDidMount() {
    const users = await API.get('users_list/0/25');
    this.setState({
      users
    });
  }

  render() {
    const { users } = this.state;
    const { searchKeyword } = this.props;

    return (
        users.length
        ? (
          <Table>
            <thead>
              <tr>
                <Title>Rejestracja</Title>
                <Title>Status</Title>
                <Title>Nazwa</Title>
                <Title>Email</Title>
                <Title>Prawa</Title>
                <Title>Akcje</Title>
              </tr>
            </thead>
            <tbody>
              {
              users
              .sort((a, b) => new Date(b.create_date).getTime() - new Date(a.create_date).getTime())
              .filter(item => item.name.toLowerCase().includes(searchKeyword))
              .map(
                item => {
                  return (
                      <Row key={item.iduser}>
                        <Field>{item.create_date}</Field>
                        <Field>{item.status}</Field>
                        <Field>{item.name}</Field>
                        <Field>{item.email}</Field>
                        <Field>{item.privilege}</Field>
                        <Field>
                        {
                          item.status === 'aktywny' ?
                          (
                            <ActionButton name='Zablokuj' icon={<MdEdit />} />
                          ) : (
                            <ActionButton name='Odblokuj' icon={<MdEdit />} />
                          )
                        }
                          <ActionButton name='Nadaj prawa' icon={<MdBuild />} />
                        </Field>
                      </Row>
                      );
                    }
                  )
                }
            </tbody>
          </Table>
      ) : (
        <MiniLoader />
      )
    );
  };
};

const mapStateToProps = state => {
  return {
    searchKeyword: state.admin.searchKeyword
  }
}
export default connect(mapStateToProps, {searchAdminArticles})(UsersTable);
