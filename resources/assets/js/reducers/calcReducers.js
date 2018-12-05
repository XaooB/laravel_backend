import { ADD, SUB } from '../actions/types';

const initialState = {
  counter: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {...state, ...state.counter += 1};
    case SUB:
      return {...state, ...state.counter -= 1};
    default:
      return state;
  }
}
