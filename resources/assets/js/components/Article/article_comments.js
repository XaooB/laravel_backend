import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import Wrapper from '../Reusable/wrapper';
import Form from './article_comments_form';
import CommentsList from './article_comments_list';
import MiniLoader from '../Reusable/mini_loader';
import { connect } from 'react-redux';
import {fetchComments, setCommentStatus} from '../../actions/'

const Title = styled.h3`
  font-size:1.5em;
  font-family:'SSPB';
  margin-top:50px;
`

const Information = styled.p`
  margin-top:5px;
`

class CommentSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingStatus: false,
      comments: {
        data:[]
      },
      status: false
    }
  }

   async componentDidMount() {
    const { articleID, fetchComments } = this.props;

    this.setState({fetchingStatus: true})
    await fetchComments(articleID);
    await this.setState({comments: this.props.comments, fetchingStatus: false, status: this.props.status});
  }

  async componentDidUpdate(prevProps) {
    const { status } = this.state,
          { articleID, fetchComments, comments } = this.props;

    if(prevProps.articleID !== articleID) {
      await fetchComments(articleID);
      await this.setState({comments: this.props.comments});
    }

    if(prevProps.status.commentAdded !== status.commentAdded) {
      await this.setState({comments: this.props.comments})
   } else {
      await this.props.setCommentStatus(false);
   }
}

  render() {
    const { articleID, user } = this.props,
          { fetchingStatus, comments } = this.state;

    return (
      <Fragment>
      <Title>Komentarze</Title>
        <Fragment>
        {
          fetchingStatus
          ? <MiniLoader />
          : user.length && comments.data.length
          ? <Fragment>
              <Form articleID = { articleID } user={user} />
              <CommentsList comments = {comments.data} user={user} articleID={articleID} />
            </Fragment>
          : !user.length && comments.data.length
          ? <Fragment>
              <Information>Aby napisać komentarz musisz się zalogować!</Information>
              <CommentsList comments = {comments.data} user={user} articleID={articleID} />
            </Fragment>
          : user.length && !comments.data.length
          ? <Fragment>
              <Form articleID = { articleID } user={user} />
              <Information>Bądź pierwszy i napisz komentarz!</Information>
            </Fragment>
          : <Information>Aby napisać komentarz musisz się zalogować!</Information>
        }
        </Fragment>
      </Fragment>
    )
  }
};

function mapStateToProps(state) {
  return {
    comments: state.comments,
    status: state.status
  }
}
export default connect(mapStateToProps, {fetchComments, setCommentStatus})(CommentSection);
