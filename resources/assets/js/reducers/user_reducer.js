import { FETCH_USER, FETCH_SEARCH, FETCH_SCHEDULE, FIXTURE_TYPE } from '../actions/types';

const initialState = {
  user: [],
  searchResult: [],
  schedule: {
    matches: [],
    filterType: 'All'
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {...state, user: action.payload};
    case FETCH_SEARCH:
      return {...state, searchResult: action.payload};
    case FETCH_SCHEDULE:
      return {...state, schedule: { ...state.schedule, matches: action.payload}};
    case FIXTURE_TYPE:
      return {...state, schedule: { ...state.schedule, filterType: action.payload}};
    default:
      return state;
  }
}
