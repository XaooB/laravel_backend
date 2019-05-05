import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Title from './admin_content_title';
import Button from './button';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions/'
import { withRouter } from 'react-router-dom';

import Toast from '../Reusable/Toast';

const Container = styled.section`
  margin-left:1px;
  margin:20px;
  margin-top:5px;
  align-items:center;
  svg {
    color:#c6c6c6;
    font-size:1.25em;
    font-family: 'SSPL';
  }
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
  border:none;
  border:2px solid #e5e5e5;
  &:focus {
    border: 2px solid #00529f;
  }
  &[type='file'] {
    border:none;
  }
`

const Textarea = styled.textarea`
  width:100%;
  resize: vertical;
  border-radius:10px;
  padding:12px;
  min-height:100px;
  max-height:250px;
  border:none;
  outline:none;
  border:2px solid #e5e5e5;
  &:focus {
    border: 2px solid #00529f;
  }
`

const Select = styled.select`
  padding:12px;
  border-radius:12px;
  width:100%;
  outline:none;
  border:2px solid #e5e5e5;
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
      category: 'Wybierz kategorię..',
      content: '',
      summary: '',
      file: '',
      showToast: false
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

  showToast () {
    this.setState({
      showToast: true
    }, () => {
      setTimeout(() => {
        this.setState({ showToast: false });
        this.props.history.push('/admin/articles');
      }
    ,2000)
    })
  }

  async handleSubmit() {
    const { title, category, file, content } = this.state;
    const data = new FormData();

    console.log(category);
    data.append('title', title);
    data.append('category', category);
    data.append('content', content);
    data.append('image', file);

    try {
      await axios.post(`/api/articles`, data);
      this.showToast();
    } catch (e) {
      throw new Error(e);
    }
  }

  handleSelect(e) {
    const id = e.target.value;
    console.log(id);
    this.setState({category: id});
  }

  render() {
    const { title, category, content, summary, file, showToast } = this.state;
    const { label, articleToEdit, article } = this.props;

    return (
      <Container>
      <Title>{label}</Title>
        <Wrapper>
        {
            <Fragment>
              <form>
                <Field>
                  <Input type='text' placeholder='Tytuł'  maxLength='75' onChange={(e) => this.setState({title: e.target.value})} value={ title }  />
                </Field>
                <Field>
                {
                  article.categories.length ?
                  (
                    <Select onChange={this.handleSelect}>
                      {
                        article.categories.map(item => <option key={item.id} value={item.idcategory}>{item.name}</option>)
                      }
                    </Select>
                  ) : (
                    'Pobieram kategorie..'
                  )
                }
                </Field>
                <Field>
                  <Textarea type='text' placeholder='Opis' onChange={(e) => this.setState({content: e.target.value})} value={ content } />
                </Field>
                <Field>
                  <Input type='file' onChange={(e) => this.setState({file: e.target.files[0]})} />
                </Field>
              </form>
              <BtnWrapper>
                <Button name='Dodaj' onClick={() => { this.handleSubmit() } } title='Dodaj artykuł' />
                <Button name='Powrót &larr;' colorBlue onClick={() => { this.props.history.goBack() } } title='Powrót' />
              </BtnWrapper>
            </Fragment>
        }
        </Wrapper>
        <Toast message='Artykuł został dodany' visible={showToast} />
      </Container>
    )
  }
}

const mapStateToProps = ({article}) => ({article});
export default connect(mapStateToProps, { fetchCategories})(withRouter(AddNewArticleForm));
