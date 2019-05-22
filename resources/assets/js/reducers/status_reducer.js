import { ADD_COMMENT_STATUS } from '../actions/types';

const initialState = {
  commentAdded: false,
  mobileNavOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_STATUS:
      return {...state, commentAdded: action.payload};
    default:
      return state;
  }
}
