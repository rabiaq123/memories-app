import { FETCH_USER, FETCH_ALL, FETCH_USER_BY_ID, UPDATE, UPDATE_NEW_FOLLOWER, REMOVE_FOLLOWER, DELETE_USER } from '../constants/actionTypes';

export default (state = { isLoading: true, user: [] }, action) => { // should it be user: [] instead of user: {}?
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_USER:
      return { ...state, user: action.payload.user};
    case FETCH_USER_BY_ID:
      return { ...state, user: action.payload.user};
    case FETCH_ALL:
      return {
        ...state,
        users: action.payload.users,
    };
    case UPDATE:
      return { ...state, user: action.payload.user };
    case UPDATE_NEW_FOLLOWER:
      return { ...state, user: action.payload.user };
    case REMOVE_FOLLOWER:
      return { ...state, user: action.payload.user };
    // this is the reducer switch statement that defines what state variable is 
    // updated by the action DELETE_USER
    case DELETE_USER:
      return state;
    default:
      return state; // return existing state unchanged
  }
};

