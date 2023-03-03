import { FETCH_USER, FETCH_ALL, START_LOADING, FETCH_USER_BY_ID } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUser = (id) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.fetchUserId(id);

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

export const getUserByID = (id) => async (dispatch) => {
  try {

    const { data } = await api.fetchUserByID(id);

    dispatch({ type: FETCH_USER_BY_ID, payload: { user: data } });
  } catch (error) {
    console.log(error);
  }
};
