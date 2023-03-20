import { FETCH_BY_NAME } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUserByName = (name) => async (dispatch) => {
    try {
      const { data } = await api.fetchUserByName(name);
  
      dispatch({ type: FETCH_BY_NAME, payload: { data } });
    } catch (error) {
      console.log(error);
    }
  }
