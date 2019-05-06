import { ADMIN_EDIT_ARTICLE_DATA, FETCH_ADMIN_ARTICLES } from '../actions/types';

const initialState = {
  articleToEdit: [],
  ownArticles:[],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_EDIT_ARTICLE_DATA:
      return {...state, articleToEdit: action.payload};
    case FETCH_ADMIN_ARTICLES:
      return {...state, ownArticles: action.payload};
    default:
    return state;
  }
}
