import { combineReducers } from 'redux';

import userReducer from './user_reducer';
import commentReducer from './comment_reducer';
import statusReducer from './status_reducer';
import articleReducer from './article_reducer';

export default combineReducers({
  user: userReducer,
  comments: commentReducer,
  status: statusReducer,
  article: articleReducer
});
