import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, signinErrors: null, signupErrors: null};
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, signinErrors: null, signupErrors: null };
    case actionType.AUTH_ERROR:
      return { ...state, authData: null, loading: false, signinErrors: action?.data, signupErrors: null };
    case actionType.SIGNUP_ERROR:
      return { ...state, authData: null, loading: false, signinErrors: null, signupErrors: action?.data };
    default:
      return state;
  }
};

export default authReducer;
