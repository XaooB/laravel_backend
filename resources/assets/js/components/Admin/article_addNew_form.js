import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Title from './admin_content_title';
import MiniLoader from '../Reusable/mini_loader';
import Button from '../Reusable/button';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions/'
import { FaRegFileImage } from "react-icons/fa";
import { withRouter } from 'react-router-dom';
import variablesCSS from '../../css/variables';

const Container = styled.section`
  margin-left:1px;
  margin:20px;
  margin-top:5px;
  align-items:center;
`

const Wrapper = styled.section`
  background:#fff;
  padding:15px 20px;
  margin:1px 20px;
`

const Field = styled.div`
  margin-bottom:15px;
`

const Input = styled.input`
  display:block;
  outline:none;
  width:100%;
  padding:12px;
  border-radius:10px;
  border:2px solid ${variablesCSS.gray};
  background:${variablesCSS.gray};
  &:focus {
    border: 2px solid ${variablesCSS.darkGray};
  }
  &[type='file'] {
    display:none;
    border:none;
  }
  &::placeholder {
    color:#1e1e1e;
  }
`

const UploadLabel = styled.label`
  display:flex;
  cursor: pointer;
  height:43px;
  border-radius:${variablesCSS.radius};
  padding:14px;
  letter-spacing:.35px;
  font-size:.85em;
  background:${variablesCSS.gray};
  svg {
    font-size:1.2em;
    margin-right:4px;
  }
`

const Textarea = styled.textarea`
  width:100%;
  resize: vertical;
  border-radius:10px;
  padding:12px;
  min-height:175px;
  max-height:400px;
  outline:none;
  background:${variablesCSS.gray};
  border:2px solid ${variablesCSS.gray};
  &:focus {
    border: 2px solid ${variablesCSS.darkGray};
  }
  &::placeholder {
    color:#1e1e1e;
  }
`

const Select = styled.select`
  padding:13px;
  border-radius:12px;
  width:100%;
  border:none;
  background:${variablesCSS.gray};
  outline:none;
`

const BtnWrapper = styled.div`
  display:flex;
  justify-content:flex-start;
  > button:not(:last-child) {
    margin-right:10px;
  }
`

class AddNewArticleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleToEdit: [],
      title: '',
      category: 0,
      content: '',
      summary: '',
      file: '',
      fetchingStatus: false,
    }

    this.handleSelect = this.handleSelect.bind(this);
  }

  async componentDidMount() {
    const { articleToEdit, fetchCategories } = this.props;

    await fetchCategories();
    articleToEdit ? this.setState({ articleToEdit}, () => {
      this.setState({
        title: articleToEdit[0].title,
        category: articleToEdit[0].category,
        content: articleToEdit[0].content
      })
    })
    : '';
  }

  async handleSubmit() {
    const { title, category, file, content } = this.state;
    const data = new FormData();

    this.setState({fetchingStatus: true})

    data.append('title', title);
    data.append('category', category);
    data.append('content', content);
    data.append('image', file);

    try {
      await axios.post(`/api/articles`, data);
    } catch (e) {
      throw new Error(e);
    } finally {
      this.setState({fetchingStatus: false});
      this.props.history.goBack();
    }
  }

  handleSelect(e) {
    const id = e.target.value;
    this.setState({category: id});
  }

  render() {
    const { title, category, content, summary, file } = this.state;
    const { label, articleToEdit, article } = this.props;

    return (
      <Container>
      <Title>{label}</Title>
      {
        article.categories.length
        ? (
          <Wrapper>
          {
              <Fragment>
                <form>
                  <Field>
                    <Input type='text' placeholder='Tytuł'  maxLength='75' onChange={(e) => this.setState({title: e.target.value})} value={ title }  />
                  </Field>
                  <Field>
                  <Select onChange={this.handleSelect} value={category}>
                    <option key={0} value={0} disabled>Wybierz kategorię..</option>
                    {
                      article.categories.map(
                        item => <option key={item.idcategory} value={item.idcategory}>{item.name}</option>
                      )
                    }
                  </Select>
                  </Field>
                  <Field>
                    <Textarea type='text' placeholder='Opis' onChange={(e) => this.setState({content: e.target.value})} value={ content } />
                  </Field>
                  <Field>
                    <UploadLabel htmlFor='upload'><FaRegFileImage />Wybierz zdjęcie</UploadLabel>
                    <Input type='file' id='upload' onChange={(e) => this.setState({file: e.target.files[0]})} />
                  </Field>
                </form>
                <BtnWrapper>
                  <Button
                    name='&larr; Cofnij'
                    onClick={() => { this.props.history.goBack() } }
                    title='Powrót' />
                  <Button name='Dodaj'
                    blue
                    onClick={() => { this.handleSubmit() } }
                    title='Dodaj artykuł'
                    isFetching={this.state.fetchingStatus} />
                </BtnWrapper>
              </Fragment>
          }
          </Wrapper>
        ) : (
          <MiniLoader />
        )
      }
      </Container>
    )
  }
}

const mapStateToProps = ({article}) => ({article});
export default connect(mapStateToProps, { fetchCategories})(withRouter(AddNewArticleForm));
