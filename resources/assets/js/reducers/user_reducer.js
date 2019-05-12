import { FETCH_USER, FETCH_USER_CHECK, FETCH_SEARCH, FETCH_USER_PROFILE, FETCH_SCHEDULE, FIXTURE_TYPE } from '../actions/types';

const initialState = {
  user: [],
  userProfile: null,
  userCheck: false,
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
    case FETCH_USER_CHECK:
      //check action directiory for an explanation purposes
      return {...state, userCheck: action.payload};
    case FETCH_USER_PROFILE:
      return {...state, userProfile: action.payload};
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
