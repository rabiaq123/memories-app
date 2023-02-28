import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
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

// export const getUser = (id) => async (dispatch) => {
//   try {
//     const { user } = await api.getUser(id);

//     dispatch({ type: AUTH, user });

//     // dispatch({ type: START_LOADING });
//     // const { data: { data } } = await api.fetchPostsByCreator(name);

//     // dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
//     // dispatch({ type: END_LOADING });

//   } catch (error) {
//     console.log(error);
//   }
// }

// export const getUsers = () => async (dispatch) => {
//   try {
//     const { data } = await api.getUsers();

//     dispatch({ type: AUTH, data });
//     console.log('data: ', data);
//   } catch (error) {
//     console.log(error);
//   }
// }