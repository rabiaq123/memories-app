import { FETCH_USER } from '../constants/actionTypes';

export default (state = { isLoading: true, user: {} }, action) => { // should it be user: [] instead of user: {}?
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_USER:
      return { ...state, user: action.payload.user };
    default:
      return state; // return existing state unchanged
  }
};

