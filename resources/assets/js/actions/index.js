import { FETCH_SEARCH, FETCH_ADMIN_ARTICLES, FETCH_NEWS, FETCH_SCHEDULE, FIXTURE_TYPE, ADMIN_EDIT_ARTICLE_DATA, FETCH_USER, FETCH_ARTICLE, FETCH_ARTICLE_NEIGHBOURS, DEC_COMMENT_COUNT, DISABLE_LIKE_BUTTON, FETCH_COMMENTS, ADD_COMMENT, ADD_COMMENT_STATUS, SELECTED_COMMENT_ID, CHANGE_LIKE_STATUS, INC_COMMENT_COUNT, INC_LIKES_COUNT, DEC_LIKES_COUNT } from './types';
import { API } from '../helpers/api';
import axios from 'axios';
import qs from 'qs';

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

export const fetchAdminArticles = () => async dispatch => {
  const request = await axios.get('/api/articles');
  dispatch({
    type: FETCH_ADMIN_ARTICLES,
    payload: request.data
  })
}

export const fetchNews = categories => async dispatch => {
  try {
    const request = await axios.get(`/api/articles_by_category/20`, {
      params: {
        categories
      },
      paramsSerializer: params => qs.stringify(params)
    })
    dispatch({
      type: FETCH_NEWS,
      payload: request.data
    })
  } catch (e) {
    throw new Error(e);
  }
}


export const fetchSchedule = () => async dispatch => {
  try {
    const matches = await axios.get('/api/matches_get_scheduled_matches/50');
    dispatch({
      type: FETCH_SCHEDULE,
      payload: matches.data
    })
  } catch (e) {
    throw new Error(e);
  }
}

export const fixtureType = name => dispatch => {
  dispatch({
    type: FIXTURE_TYPE,
    payload: name
  })
}

export const fetchArticleNeighbours = articleID => async dispatch => {
  const request = await axios.get(`/api/articles_show_neighbours/${articleID}`);
  dispatch({
    type: FETCH_ARTICLE_NEIGHBOURS,
    payload: request.data
  })
}

export const fetchSearch = keyword => async dispatch => {
  const request = await API.get(`articles_filtrate/5/${keyword}`);
  dispatch({
    type: FETCH_SEARCH,
    payload: request
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
    //przepisac, aby dodawało lokalne element do talibcy, a nie fetchwoało ponownie. Stwarza problemy ze względu na implementacje cache.
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

export const StoreAdminArticleToEdit = data => dispatch => {
  dispatch({
    type: ADMIN_EDIT_ARTICLE_DATA,
    payload: [data]
  })
}
