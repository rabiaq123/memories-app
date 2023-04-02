import { FETCH_USER, FETCH_ALL, FETCH_USER_BY_ID, UPDATE, UPDATE_NEW_FOLLOWER, REMOVE_FOLLOWER, DELETE_USER, UPDATE_ERROR } from '../constants/actionTypes';

export default (state = { isLoading: true, user: [] }, action) => { // should it be user: [] instead of user: {}?
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true, error: null };
    case 'END_LOADING':
      return { ...state, isLoading: false, error: null };
    case FETCH_USER:
      return { ...state, user: action.payload.user, error: null};
    case FETCH_USER_BY_ID:
      return { ...state, user: action.payload.user, error: null};
    case FETCH_ALL:
      return {
        ...state,
        users: action.payload.users,
         error: null
    };
    case UPDATE:
      return { ...state, user: action.payload.user, error: null };
    case UPDATE_ERROR:
      return { ...state, user: action.payload.user, error: action.payload.error };
    case UPDATE_NEW_FOLLOWER:
      return { ...state, user: action.payload.user, error: null };
    case REMOVE_FOLLOWER:
      return { ...state, user: action.payload.user, error: null };
    // this is the reducer switch statement that defines what state variable is 
    // updated by the action DELETE_USER
    case DELETE_USER:
      return state;
    default:
      return state; // return existing state unchanged
  }
};

