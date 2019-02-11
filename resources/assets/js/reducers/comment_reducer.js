import { FETCH_COMMENTS, SELECTED_COMMENT_ID, EDIT_COMMENT_STATUS, ADD_COMMENT } from '../actions/types';

const initialState = {
  selectedCommentID: null,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {...state, data: action.payload}
    case SELECTED_COMMENT_ID:
      return {...state, selectedCommentID: action.payload}
    default:
      return state;
  }
}
