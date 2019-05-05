import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../Reusable/button';
import User from './article_user';
import axios from 'axios';
import {connect} from 'react-redux';
import MiniLoader from '../../components/Reusable/mini_loader';
import {API} from '../../helpers/api';
import { editComment, setCommentStatus } from '../../actions/';

const Form = styled.form`
  flex:8;
  width:100%;
  margin-top:10px;
  margin-bottom:5px;
  margin-left:5px;
`

const TextField = styled.textarea`
  font-size:1.1em;
  resize:vertical;
  line-height:1.5;
  width:100%;
  border-radius:5px;
  border:2px solid rgb(169, 169, 169);
  min-height:80px;
  max-height:200px;
  padding:10px;
  margin-bottom:10px;
  outline:none;
  transition: all .25s;
  &:focus {
    transition: all .25s;
    border:2px solid #00529f;
    border-radius: 5px;
  }
`

const Counter = styled.span`
  font-weight:lighter;
  display:block;
  align-self:center;
  color: rgb(169, 169, 169);
  font-size:.85em;
`

const Wrapper = styled.section`
  display:flex;
  flex-flow: row wrap;
  justify-content: space-between;
`

const ButtonWrapper = styled.div`
  display:flex;
  flex-flow:row wrap;
  > button:not(:last-child) {
    margin-right:10px;
  }
`

class EditCommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fetchingStatus: false,
      content: '',
      charactersUsed: 0,
      editingContent: ''
    }

    this.handleTextarea = this.handleTextarea.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.cancelPost = this.cancelPost.bind(this);
  }

  componentDidMount() {
    this.setState({content: this.props.content})
  }

  handleTextarea(event) {
    const charactersUsed = event.target.value.length;

    this.setState({content: event.target.value});
    if(charactersUsed < 501)
      return this.setState({charactersUsed: event.target.value.length});
  }

  async handlePost() {
    this.setState({fetchingStatus: true});

    const { content } = this.state,
          { comments, articleID } = this.props;
          console.log(articleID);

    await this.props.editComment({content, selectedCommentID: comments.selectedCommentID, articleID});
    this.setState({
      charactersUsed: 0,
      content: '',
      fetchingStatus: false
    })
    this.props.handleEdit && this.props.handleEdit();
  }

  cancelPost() {
    this.props.handleEditForm();
  }

  render() {
    const { charactersUsed, fetchingStatus } = this.state,
          { articleID, commentID, user, comments, isEditing } = this.props;

    return (
      <Form>
        <TextField value={this.state.content} onChange={this.handleTextarea} maxLength='500'></TextField>
        <Wrapper>
          <Counter id='counter'>Użyto znaków: {charactersUsed}/500</Counter>
          <ButtonWrapper>
            <Button name='Anuluj' onClick={this.cancelPost} />
            <Button name='Edytuj wiadomość' colorBlue onClick={this.handlePost} isFetching={fetchingStatus} />
          </ButtonWrapper>
        </Wrapper>
      </Form>
    )
  }
}

const mapStateToProps = ({comments}) => ({comments});
export default connect(mapStateToProps, {editComment, setCommentStatus})(EditCommentForm);
