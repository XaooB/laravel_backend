import { FETCH_USER } from './types';
import { API } from '../helpers/api';

export const fetchUser = () => async dispatch => {
  const request = await API.get('users_check_user');
  dispatch({
    type: FETCH_USER,
    payload: request
  })
}
