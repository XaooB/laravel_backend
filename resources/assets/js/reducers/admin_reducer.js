import { ADMIN_EDIT_ARTICLE_DATA, FETCH_ADMIN_ARTICLES, SELECT_ARTICLES_BY_KEYWORD, SET_ADMIN_LOAD_COUNTER } from '../actions/types';

const initialState = {
  articleToEdit: [],
  ownArticles:[],
  loadCounter: 10,
  searchKeyword: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_EDIT_ARTICLE_DATA:
      return {...state, articleToEdit: action.payload};
    case FETCH_ADMIN_ARTICLES:
      return {...state, ownArticles: action.payload};
    case SELECT_ARTICLES_BY_KEYWORD:
      return {...state, searchKeyword: action.payload};
    case SET_ADMIN_LOAD_COUNTER:
      return {...state, loadCounter: action.payload};
    default:
      return state;
  }
}
