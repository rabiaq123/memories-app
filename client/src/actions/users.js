import { EDIT, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from '../constants/actionTypes';
import * as api from '../api/index.js';

// export const updateProfile = (user) => async(dispatch, getState) => {
//     try {
//         dispatch({type: USER_UPDATE_REQUEST });

//         // Does the user have the authorization to update their profile
//         const {
//             userLogin: { userInfo },
//         } = getState();

//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${userInfo.token}`,
//             }
//         };

//         const { data } = await Axios.post("/api/users/profile", user, config);

//         dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

//         localStorage.setItem("userInfo", JSON.stringify(data));
//     } catch(error){
//         dispatch({
//             type: USER_UPDATE_FAIL,
//             payload:
//                 error
//         })
//     }
// };