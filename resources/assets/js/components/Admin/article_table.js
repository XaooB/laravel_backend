import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import { Link } from 'react-router-dom';
import ActionButton from './article_action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { StoreAdminArticleToEdit, fetchAdminArticles, searchAdminArticles } from '../../actions'
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import ConfimationModal from '../Reusable/modal_confirmation';

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
  &:not(:last-child) {
    border-bottom:1px solid #ededed;
  }
`

const CustomRadio = styled.label`
  position:relative;
  cursor:pointer;
  top:-10px;
  vertical-align: middle;
  &:before {
    content:'';
    position:absolute;
    left:0;
    top:0;
    width:16px;
    height:16px;
    border-radius:6px;
    border:2px solid #ee324e;
  }
`

 const Input = styled.input`
  display:none;
  &:checked ~ ${CustomRadio}:after {
    content:'✔';
    position:absolute;
    left:3px;
    top:-1px;
    color:#ee324e;
 }
`

const Information = styled.p`
  padding:10px 0;
`

class ArticleTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      showConfirmationModal: false,
      fetchingStatus: false,
      selectedArticleID: null,
      currentMainRef: null,
      clickedInput: null
    }

    this.setInputRef = this.setInputRef.bind(this);
    this.handleMainArticleUpdate = this.handleMainArticleUpdate.bind(this);
    this.onDenied = this.onDenied.bind(this);
    this.setCurrentMain = this.setCurrentMain.bind(this);
  }

  componentWillUnmount() {
    this.props.searchAdminArticles('')
  }

  async componentDidMount() {
    const { loadCounter } = this.props.admin;

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

  async handleDelete(id) {
    try {
      const request = await axios.delete(`/api/articles/${id}`)
      this.showToast();
    } catch (e) {
      throw new Error(e);
    }
  }


  async handleMainArticleUpdate() {
      const { selectedArticleID } = this.state;
      const data = new FormData();

      this.setState({fetchingStatus: true});
      try {
        const request = await axios.put(`/api/articles_staff_change_main/${selectedArticleID}`)
      } catch (e) {
        throw new Error(e);
      } finally {
        this.setState({fetchingStatus: false, showConfirmationModal: false})
      }
    }

  setInputRef(node) {
    this.setState({clickedInput: node.target})
  }

  setCurrentMain(node) {
    this.setState({currentMainRef: node})
  }

  async onDenied() {
    const { clickedInput, currentMainRef } = this.state;

    this.setState({showConfirmationModal: false});
    this.state.clickedInput.checked = false;

    if(currentMainRef !== null)
      currentMainRef.checked = true;
  }

  render() {
    const { articles, fetchingStatus, showConfirmationModal, mainArticle } = this.state;
    const { searchKeyword } = this.props.admin;

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
              articles
              .filter(item => item.title.toLowerCase().includes(searchKeyword))
              .map(
                item => {
                  return (
                      <Row key={item.idarticle}>
                        <Field>{item.create_date}</Field>
                        <Field>DODANY</Field>
                        <Field>{item.title}</Field>
                        <Field>
                          {
                            item.main
                            ? (
                              <Fragment>
                                 <Input type='radio' id={item.idarticle} name='mainArticle' defaultChecked ref={this.setCurrentMain} />
                                 <CustomRadio htmlFor={item.idarticle} />
                               </Fragment>
                             )	: (
                               <Fragment>
                                 <Input type='radio' id={item.idarticle} name='mainArticle' onChange={this.setInputRef} />
                                 <CustomRadio
                                   htmlFor={item.idarticle}
                                   onClick={() => this.setState({showConfirmationModal: true, selectedArticleID: item.idarticle})} />
                               </Fragment>
                             )
                          }
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
                    }
                  )
                }
            </tbody>
          </Table>
          <ConfimationModal
            title='Zmiana artykułu głównego'
            text='Czy jesteś pewien, że chcesz ustawić ten artykuł jako główny? Tylko jeden artykuł w danym momencie może pełnić taką rolę.'
            btnTextYes='Ustaw'
              btnTextNo='Cofnij'
              denied={this.onDenied}
              accept={this.handleMainArticleUpdate}
              status={fetchingStatus}
              showModal={showConfirmationModal}
            />
        </div>
      ) : <Information>Brak artykułów.</Information>
    );
  };
};

const mapStateToProps = ({admin}) => ({admin});
export default withRouter(connect(mapStateToProps, { StoreAdminArticleToEdit, fetchAdminArticles, searchAdminArticles })(ArticleTable));
