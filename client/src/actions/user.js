import { START_LOADING, END_LOADING, FETCH_USER } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUser = (name) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { user } = await api.getUser(name);

    dispatch({ type: FETCH_USER, payload: {user} });
    // dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
