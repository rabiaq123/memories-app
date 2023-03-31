import { AUTH, AUTH_ERROR, SIGNUP_ERROR } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    // https://adrianarlett.gitbooks.io/idiomatic-redux-by-dan-abramov/content/displaying-error-messages.html
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
    await api.signUp(formData)
    .then((res) => {
      dispatch({ type: AUTH, data: res.data });
      router.push('/');
    })
    .catch((err) => {
      dispatch({ type: SIGNUP_ERROR, data: err.response.data.message });
    });
  } catch (error) {
    console.log(error);
  }
};
