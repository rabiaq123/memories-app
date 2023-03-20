import { FETCH_BY_NAME } from '../constants/actionTypes';

export default (state = { isLoading: true, secondaryuser: [] }, action) => { // should it be user: [] instead of user: {}?
  switch (action.type) {
    case FETCH_BY_NAME:
      return { ...state, secondaryuser: action.payload.data,};
    default:
      return state; // return existing state unchanged
  }
};
