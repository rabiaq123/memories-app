import { FETCH_USER, FETCH_ALL, START_LOADING, UPDATE, UPDATE_NEW_FOLLOWER, REMOVE_FOLLOWER } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUsers = () => async (dispatch) => {
    try {
      const { data } = await api.getUsers();
      console.log('hello from get Users');
  
      dispatch({ type: FETCH_ALL, payload: { data } });
    } catch (error) {
      console.log(error);
    }
  }