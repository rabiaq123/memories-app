import { FETCH_USER, FETCH_ALL, START_LOADING, UPDATE, UPDATE_NEW_FOLLOWER, REMOVE_FOLLOWER } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUser = (id) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.fetchUserId(id);

    dispatch({ type: FETCH_USER, payload: { user: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { users } = await api.getUsers();

    dispatch({ type: FETCH_ALL, payload: {users} });
  } catch (error) {
    console.log(error);
  }
}

// export const getUserByID = (id) => async (dispatch) => {
//   try {

//     const { data } = await api.fetchUserByID(id);

//     dispatch({ type: FETCH_USER_BY_ID, payload: { user: data } });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const updateUserProfile = (id, email, name) => async (dispatch) => {
  try {

    let user_data = {
      "id" : id,
      "name" : name,
      "email" : email,
    }

    const { data } = await api.updateUser(user_data);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addNewFollowerAction = (id, new_follower_id) => async (dispatch) => {
  try {

    let user_data = {
      "id" : id,
      "new_follower" : new_follower_id,
    }

    const { data } = await api.addNewFollower(user_data);

    dispatch({ type: UPDATE_NEW_FOLLOWER, payload: {user: data} });
  } catch (error) {
    console.log(error);
  }
};

export const removeFollowerAction = (id, remove_follower_id) => async (dispatch) => {
  try {

    let user_data = {
      "id" : id,
      "follower_to_remove" : remove_follower_id,
    }

    const { data } = await api.addRemoveFollowerAPICall(user_data);

    dispatch({ type: REMOVE_FOLLOWER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
