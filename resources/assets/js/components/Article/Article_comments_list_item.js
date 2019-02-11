import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaReply, FaBan } from 'react-icons/fa';
import { IoIosFlag } from 'react-icons/io';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import User from './article_user';
import Comments from './article_comments_list';
import AddCommentForm from './article_comments_form';
import EditCommentForm from './article_comments_edit_form';
import dateConverter from '../../helpers/dateConverter';
import { selectedCommentID, deleteComment, hideComment } from '../../actions';

const ListItem = styled.li`
  display:flex;
  animation:animateComment .3s ease-in;
  flex-flow:row nowrap;
  justify-content:flex-start;
  padding-top:25px;
  &:not(:last-child) {
    margin-bottom:15px;
  }
  @keyframes animateComment {
  0% {
    margin-top:-50px;
    opacity:0;
  }
  100% {
    margin-left:0;
    opacity:1;
  }
}
`;

const Article = styled.article`
  margin-left:4px;
  flex:1;
`;

const Header = styled.header`
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  flex-flow: row wrap;
`;

const UserName = styled.span`
  font-family:'SSPB';
`;

const Added = styled.span`
  font-size:.8em;
  letter-spacing:.6px;
  color:#c8c8c8;
`;

const Content = styled.p`
  white-space:pre-line;
  padding:8px 0;
  font-size:1.05em;
`;

const Footer = styled.footer`
  margin-top:6px;
  display:flex;
  flex-flow:row wrap;
  align-items:center;
  justify-content:flex-start;
  margin-bottom:15px;
`;

const ActionName = styled.span`
  display:inline-block;
  margin-left:3px;
  position:relative;
  top:-1px;
`;

const FooterItem = styled.button`
  background:none;
  font-size:.85em;
  outline:none;
  cursor:pointer;
  padding:3px;
  border:none;
  color:rgb(169,169,169);
  cursor:pointer;
  &:not(:last-child) {
    margin-right:6px;
  }
  &:hover {
    color:#00529f;
  }
  svg {
    /* ikony przy przyciskach */
    @media only screen and (max-width: 480px) {
      display:none;
    }
  }
`;

/**
 * Renders single Comment.
 */
class SingleComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingForm: false,
      isEditing: false,
    };

    this.handlePostForm = this.handlePostForm.bind(this);
    this.handleEditForm = this.handleEditForm.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handlePostForm() {
    const { showingForm } = this.state;
    this.setState({ showingForm: !showingForm });
  }

  handleEditForm() {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }

  handleEdit() {
    const { comment, selectedCommentID } = this.props;
    selectedCommentID(comment.idcomment);
    this.handleEditForm();
  }

  handleDelete() {
    const { articleID, comment, deleteComment } = this.props;
    deleteComment({ articleID, idcomment: comment.idcomment });
  }

  handleHide() {
    const { articleID, comment, hideComment } = this.props;
    hideComment({ articleID, idcomment: comment.idcomment });
  }

  render() {
    const { comment, articleID, user } = this.props;
    const { showingForm, isEditing } = this.state;

    return (
      <ListItem>
        <User user={comment.user} />
        <Article>
          <Header>
            <UserName>{comment.user.name}</UserName>
            {!comment.modify_date
              ? <Added>{dateConverter.toStageDate(comment.create_date)}</Added>
              : (
                <Added>
                  edytowano
                  {dateConverter.toStageDate(comment.modify_date)}
                </Added>
              )
            }
          </Header>
          {isEditing
            ? (
              <EditCommentForm
                articleID={articleID}
                handleEdit={() => this.handleEdit()}
                handleEditForm={() => this.handleEditForm()}
                content={comment.content}
              />
            )
            : <Content>{comment.content}</Content>
          }
          {user.length
            ? (
              <Footer>
                <FooterItem onClick={this.handlePostForm} title="Napisz odpowiedź">
                  <FaReply />
                  <ActionName>Odpowiedz</ActionName>
                </FooterItem>
                {user[0].iduser === comment.user.iduser
                  ? (
                    <Fragment>
                      <FooterItem title="Edytuj komentarz" onClick={this.handleEdit}>
                        <MdEdit />
                        <ActionName>Edytuj</ActionName>
                      </FooterItem>
                      <FooterItem title="Usuń komentarz" onClick={this.handleDelete}>
                        <MdDeleteForever />
                        <ActionName>Usuń</ActionName>
                      </FooterItem>
                    </Fragment>
                  )
                  : ''}
                <FooterItem title="Zgłoś użytkownika">
                  <FaBan />
                  <ActionName>Zgłoś</ActionName>
                </FooterItem>
                {user[0].tier > 2
                  ? (
                    <FooterItem title="Ukryj komentarz" style={{ color: '#ee324e' }} onClick={this.handleHide}>
                      <IoIosFlag />
                      <ActionName>Ukryj</ActionName>
                    </FooterItem>
                  )
                  : ''
                }
              </Footer>
            )
            : ''}
          {showingForm ? <AddCommentForm user={user} articleID={articleID} commentID={comment.idcomment} handleForm={() => this.handlePostForm()} /> : ''}
          {comment.comments ? <Comments comments={comment.comments} user={user} articleID={articleID} /> : ''}
        </Article>
      </ListItem>
    );
  }
}

SingleComment.defaultProps = {
  articleID: null,
  user: [],
};

SingleComment.propTypes = {
  articleID: PropTypes.number,
  user: PropTypes.arrayOf(PropTypes.object),
};

export default connect(null, { deleteComment, selectedCommentID, hideComment })(SingleComment);
