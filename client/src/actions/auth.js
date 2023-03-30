import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import axios from 'axios';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log('data is ' + JSON.stringify(data));
    
    dispatch({ type: AUTH, data })
    router.push('/');

    // return axios.post('http://localhost:5500/user/signin', formData)
    // .then(({data}) => {
    //   console.log('data is ' + JSON.stringify(data));
    //   dispatch({ type: AUTH, data });
    //   router.push('/');
    // })
    // .catch((err) => {
    //   console.log(err);
    // })

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
