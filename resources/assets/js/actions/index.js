import { FETCH_USER, FETCH_ARTICLE, DEC_COMMENT_COUNT, DISABLE_LIKE_BUTTON, FETCH_COMMENTS, ADD_COMMENT, ADD_COMMENT_STATUS, SELECTED_COMMENT_ID, CHANGE_LIKE_STATUS, INC_COMMENT_COUNT, INC_LIKES_COUNT, DEC_LIKES_COUNT } from './types';
import { API } from '../helpers/api';
import axios from 'axios';

export const fetchUser = () => async dispatch => {
  const request = await API.get('users_check_user');
  dispatch({
    type: FETCH_USER,
    payload: request
  })
}

export const fetchArticle = articleID => async dispatch => {
  const request = await axios.get(`/api/articles_show_article/${articleID}`);
  dispatch({
    type: FETCH_ARTICLE,
    payload: request.data
  })
}

export const fetchComments = articleID => async dispatch => {
  const request = await axios.get(`/api/comments_get_article_comments/${articleID}`);
  dispatch({
    type: FETCH_COMMENTS,
    payload: request.data
  })
}

export const addComment = data => async dispatch => {
  const { idreference } = data;
  try {
    await axios.post('/api/comments', data);
    await dispatch(fetchComments(idreference));
  } catch(e) { throw new Error(e) };
  dispatch(setCommentStatus(true));
  dispatch(incCommentCount());
}


export const editComment = data => async dispatch => {
  const { selectedCommentID, content, articleID } = data;
  try {
    await axios.post(`/api/comments/${selectedCommentID}`, {_method: 'PUT', content});
    await dispatch(fetchComments(articleID));
  } catch(e) { throw new Error(e) }
  dispatch(setCommentStatus(true));
}

export const deleteComment = data => async dispatch => {
  const { idcomment, articleID } = data;
  try {
    await axios.post(`/api/comments/${idcomment}`, {_method: 'DELETE'});
    await dispatch(fetchComments(articleID));
  } catch(e) { throw new Error(e) }
  dispatch(setCommentStatus(true));
  dispatch(decCommentCount());
}

export const hideComment = data => async dispatch => {
  const {articleID, idcomment} = data;
  try {
    await axios.post(`/api/comments_staff_change_comment_visibility/${idcomment}`, {_method: 'PUT'});
    await dispatch(fetchComments(articleID));
  } catch(e) { throw new Error(e) }
  dispatch(setCommentStatus(true));
}

export const incLikesCount = data => async dispatch => {
  dispatch(disableLikeButton(true));
  try {
    await axios.post(`/api/userlikes`, data);
  } catch(e) { throw new Error(e) };
  dispatch({type: INC_LIKES_COUNT});
  dispatch(changeLikeStatus());
  dispatch(disableLikeButton(false));
}

export const decLikesCount = articleID => async dispatch => {
  dispatch(disableLikeButton(true));
  try {
    await axios.post(`/api/userlikes/${articleID}`, {_method: 'DELETE'})
  } catch(e) { throw new Error(e) };
  dispatch({type: DEC_LIKES_COUNT});
  dispatch(changeLikeStatus());
  dispatch(disableLikeButton(false));
}

export const selectedCommentID = idcomment => dispatch => {
  dispatch({
    type: SELECTED_COMMENT_ID,
    payload: idcomment
  })
}

export const incCommentCount = () => dispatch => {
  dispatch({
    type: INC_COMMENT_COUNT
  })
}

export const decCommentCount = () => dispatch => {
  dispatch({
    type: DEC_COMMENT_COUNT
  })
}

export const changeLikeStatus = () => dispatch => {
  dispatch({
    type: CHANGE_LIKE_STATUS
  })
}

export const disableLikeButton = boolean => dispatch => {
  dispatch({
    type: DISABLE_LIKE_BUTTON,
    payload: boolean
  })
}

export const setCommentStatus = boolean => dispatch => {
  dispatch({
    type: ADD_COMMENT_STATUS,
    payload: boolean
  })
}
