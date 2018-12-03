import {ADD, SUB} from './types';

export const add = () => {
  return {
    type: ADD,
  }
}

export const sub = () => {
  return {
    type: SUB,
  }
}
