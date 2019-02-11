import { ADD_COMMENT_STATUS } from '../actions/types';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_STATUS:
      return action.payload;
    default:
      return state;
  }
}
