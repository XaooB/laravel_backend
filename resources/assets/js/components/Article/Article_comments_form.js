import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../Reusable/button';
import User from './article_user';
import axios from 'axios';
import {connect} from 'react-redux';
import MiniLoader from '../../components/Reusable/mini_loader';
import {API} from '../../helpers/api';

import { addComment, setCommentStatus } from '../../actions/';

window.axios = axios;

const Form = styled.form`
  flex:8;
  width:100%;
  margin-top:10px;
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

const Warning = styled.span`
  color:#ee324e;
`

class AddCommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fetchingStatus: false,
      content: '',
      charactersUsed: 0,
    };

    this.handleTextarea = this.handleTextarea.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleTextarea(event) {
    const charactersUsed = event.target.value.length;

    this.setState({content: event.target.value});
    if(charactersUsed < 501)
      return this.setState({charactersUsed: event.target.value.length});
  }

  async handlePost() {
    const { charactersUsed, content } = this.state;
    const { articleID, commentID, handleForm } = this.props;
    const idsubreference = !commentID ? 0 : commentID;
    const idreference = articleID;

    if (charactersUsed <= 0) return true;
    this.setState({ fetchingStatus: true });

    await this.props.addComment({content, idsubreference, idreference});
    await this.setState({
      charactersUsed: 0,
      content: '',
      fetchingStatus: false
    });
    handleForm && handleForm();
  }

  render() {
    const { charactersUsed, fetchingStatus } = this.state,
          { articleID, commentID, user, comments, isEditing } = this.props;

    return (
      <Wrapper>
        <User user={user[0]} />
        <Form>
          <TextField value={this.state.content} onChange={this.handleTextarea} maxLength='500'></TextField>
          <Wrapper>
            {
              charactersUsed == 500
              ? <Counter><Warning>Użyto znaków: {charactersUsed}/500 - osiągnięto maksymalną ilość znaków!</Warning></Counter>
              : <Counter>Użyto znaków: {charactersUsed}/500</Counter>
            }
            <Wrapper style={{alignSelf: 'flex-end', alignItems:'center'}}>
              <Button name='Wyślij wiadomość' colorBlue onClick={this.handlePost} isFetching={fetchingStatus} />
            </Wrapper>
          </Wrapper>
        </Form>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({comments}) => ({comments});
export default connect(mapStateToProps, {addComment, setCommentStatus})(AddCommentForm);
