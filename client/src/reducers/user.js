import { FETCH_USER, FETCH_ALL } from '../constants/actionTypes';

export default (state = { isLoading: true, user: [] }, action) => { // should it be user: [] instead of user: {}?
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_USER:
      return { ...state, user: action.payload.user};
    case FETCH_ALL:
      return {
        ...state,
        users: action.payload.data,
      };
    default:
      return state; // return existing state unchanged
  }
};

