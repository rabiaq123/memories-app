import { AUTH, AUTH_ERROR } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    await api.signIn(formData)
    .then((res) => {
      dispatch({ type: AUTH, data: res.data });
      router.push('/');
    })
    .catch((err) => {
      dispatch({ type: AUTH_ERROR, data: err.response.data.message });
    });
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
