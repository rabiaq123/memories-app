import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      // console.log('action.data is ' + JSON.stringify(action.data));
      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    case actionType.AUTH_ERROR:
      return { ...state, authData: null, loading: false, errors: action?.data };
    default:
      return state;
  }
};

export default authReducer;
