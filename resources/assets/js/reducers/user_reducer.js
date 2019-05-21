import { FETCH_USER, FETCH_USER_CHECK, SET_VOTE_FLAG_CURRENT_POLL, FETCH_CURRENT_POLL, SELECTED_POLL_ANSWER, FETCH_SEARCH, FETCH_USER_PROFILE, FETCH_SCHEDULE, FIXTURE_TYPE } from '../actions/types';

const initialState = {
  user: [],
  userProfile: null,
  userCheck: false,
  pollData: null,
  pollAnswer: null,
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
    case FETCH_CURRENT_POLL:
      return {...state, pollData: action.payload};
    case SET_VOTE_FLAG_CURRENT_POLL:
      return {...state, pollData: {...state.pollData, voted: action.payload}};
    case FETCH_SEARCH:
      return {...state, searchResult: action.payload};
    case SELECTED_POLL_ANSWER:
      return {...state, pollAnswer: action.payload};
    case FETCH_SCHEDULE:
      return {...state, schedule: { ...state.schedule, matches: action.payload}};
    case FIXTURE_TYPE:
      return {...state, schedule: { ...state.schedule, filterType: action.payload}};
    default:
      return state;
  }
}
