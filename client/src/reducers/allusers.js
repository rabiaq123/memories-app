import { FETCH_USER, FETCH_ALL, FETCH_USER_BY_ID, UPDATE, UPDATE_NEW_FOLLOWER, REMOVE_FOLLOWER } from '../constants/actionTypes';

export default (state = { isLoading: true, allusers: [] }, action) => { // should it be user: [] instead of user: {}?
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return { ...state, allusers: action.payload.data,};
    default:
      return state; // return existing state unchanged
  }
};