import { FETCH_USER, FETCH_ALL, START_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUser = (name) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.fetchUserName(name);

    dispatch({ type: FETCH_USER, payload: { user: data } });
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
