import { FETCH_ARTICLE, DISABLE_LIKE_BUTTON, DEC_COMMENT_COUNT, CHANGE_LIKE_STATUS, INC_COMMENT_COUNT, INC_LIKES_COUNT, DEC_LIKES_COUNT } from '../actions/types';

const initialState = {
  blockLikeButton: false,
  data:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLE:
      return {...state, data: action.payload}
    case INC_COMMENT_COUNT:
      return {...state, data: {...state.data, comments_count: state.data.comments_count + 1}}
    case DEC_COMMENT_COUNT:
      return {...state, data: {...state.data, comments_count: state.data.comments_count - 1}}
    case INC_LIKES_COUNT:
      return {...state, data: {...state.data, likes_count: state.data.likes_count + 1}}
    case DEC_LIKES_COUNT:
      return {...state, data: {...state.data, likes_count: state.data.likes_count - 1}}
    case CHANGE_LIKE_STATUS:
      return {...state, data: {...state.data, liked: !state.data.liked}}
    case DISABLE_LIKE_BUTTON:
      return {...state, blockLikeButton: action.payload}
    default:
      return state;
  }
}
