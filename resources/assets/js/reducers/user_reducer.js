import { FETCH_USER } from '../actions/types';

const initialState = {
  user: []
}

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return {...state, ...state.action};
    default:
      return state;
  }
}
