import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Title from './admin_content_title';
import Button from '../Reusable/button';
import { withRouter } from 'react-router-dom';
import { FaRegFileImage } from "react-icons/fa";
import { fetchCategories } from '../../actions/'
import MiniLoader from '../Reusable/mini_loader';
import { connect } from 'react-redux';
import axios from 'axios';
import ModalNotification from '../Reusable/modal_notification';
import variablesCSS from '../../css/variables';

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

const Background = styled.section`
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
  border:none;
  display:none;
}
&::placeholder {
  color:#1e1e1e;
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

const Information = styled.p`
  margin-bottom:15px;
`

const BtnWrapper = styled.div`
  display:flex;
  justify-content:flex-start;
  > button:not(:last-child) {
    margin-right:10px;
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

const ImagePreview = styled.span`
  display:inline-block;
  cursor:pointer;
  &:hover {
    text-decoration:underline;
  }
`

const ImageModal = styled.figure`
  display: ${props => props.display};
  background:rgba(0,0,0,.2);
  cursor:pointer;
  position:fixed;
  left:0;
  top:0;
  align-items:center;
  justify-content:center;
  width:100%;
  height:100%;
  img {
    border:10px solid #fff;
    cursor:default;
    max-height:300px;
  }
`

class ArticleEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleToEdit: [],
      title: '',
      category: 'liga hiszpańska',
      content: '',
      summary: '',
      file: '',
      showImageModal: 'none',
      fetchingStatus: false,
      catFetching: true
    }

    this.imageModal = React.createRef();

    this.handleSelect = this.handleSelect.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  redirectTo() {
    return <Redirect to='/admin/articles' />
  }

  async componentDidMount() {
    const { articleToEdit, fetchCategories } = this.props;

    if(!articleToEdit.length) {
      this.setState({ catFetching: false })
    } else {
      await fetchCategories();

      this.setState({ articleToEdit: articleToEdit, catFetching: false }, () => {
        let categoryID = this.setCategoryID(articleToEdit[0].category).idcategory
        this.setState({
          title: articleToEdit[0].title,
          category: categoryID,
          content: articleToEdit[0].content
        })
      })
    }
  }

  setCategoryID(cat) {
    const { categories } = this.props.article;
    return categories.find(item => cat === item.name);
  }

  async handleEdit() {
    const { idarticle } = this.props.articleToEdit[0];
    const { title, category, file, content } = this.state;
    const data = new FormData();

    this.setState({fetchingStatus: true});

    data.append('title', title);
    data.append('category', category);
    data.append('content', content);
    data.append('_method', 'PUT');

    if(file != '')
      data.append('image', file);

    try {
      await axios.post(`/api/articles/${idarticle}`, data);
    } catch (e) {
      throw new Error(e);
    } finally {
      this.props.history.push({
        pathname: '/admin/articles',
        state: {
          showNotificationModal: true,
          text: 'Artykuł został zmieniony.',
          type: 'success'
        }
      });
    }
  }

  closeModal(e) {
    if(e.target !== this.imageModal.current) {
      this.setState({ showImageModal: 'none' })
    }
  }

  handleSelect(e) {
    const id = e.target.value;
    this.setState({category: id});
  }

  render() {
    const { title, category, content, summary, file, showImageModal, fetchingStatus, catFetching } = this.state;
    const { label, articleToEdit, article } = this.props;

    return (
      <Container>
      <Title>{label}</Title>
      {
        catFetching
        ? <MiniLoader />
        : articleToEdit.length
        ? (
          <Background>
          <Fragment>
            <form>
              <Field>
              <Input type='text' placeholder='Tytuł'  maxLength='75' onChange={(e) => this.setState({title: e.target.value})} value={ title }  />
              </Field>
              <Field>
                <Select onChange={this.handleSelect} value={category}>
                  {
                    article.categories.map(item => <option key={item.idcategory} value={item.idcategory}>{item.name}</option>)
                  }
                </Select>
              </Field>
              <Field>
                <Textarea type='text' placeholder='Opis' onChange={(e) => this.setState({content: e.target.value})} value={ content } />
              </Field>
              <Field>
                <ImagePreview onClick={() => this.setState({showImageModal: 'flex'})}>Podgląd aktualnego zdjęcia</ImagePreview>
                <ImageModal display={showImageModal} onClick={this.closeModal}>
                  <img src={articleToEdit[0].image} title={articleToEdit[0].title} alt={articleToEdit[0].title} ref={this.imageModal}/>
                </ImageModal>
              </Field>
              <Field>
                <UploadLabel htmlFor='upload'><FaRegFileImage />Wybierz zdjęcie</UploadLabel>
                <Input type='file' id='upload' onChange={(e) => this.setState({file: e.target.files[0]})} />
              </Field>
              </form>
                <BtnWrapper>
                  <Button name='&larr; Cofnij' colorBlue onClick={() => { this.props.history.goBack() }} />
                  <Button
                    blue
                    name='Edytuj'
                    isFetching={fetchingStatus}
                    onClick={ () => { this.handleEdit() }} />
                </BtnWrapper>
              </Fragment>
              </Background>
            ) : (
              <Background>
                <Information>Wróc i ponownie wybierz artykuł.</Information>
                <Button name='Powrót &larr;' colorBlue onClick={() => { this.props.history.goBack() }} />
              </Background>
            )
          }
      </Container>
    )
  }
}

const mapStateToProps = ({article}) => ({article});
export default connect(mapStateToProps, { fetchCategories})(withRouter(ArticleEditForm));
