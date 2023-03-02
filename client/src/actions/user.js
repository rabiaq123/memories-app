import { FETCH_USER, FETCH_ALL } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUser = (name) => async (dispatch) => {
  try {
    const { user } = await api.getUser(name);

    dispatch({ type: FETCH_USER, payload: {user} });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { users } = await api.getUsers();

    dispatch({ type: FETCH_ALL, payload: {users} });
  } catch (error) {
    console.log(error);
  }
}
