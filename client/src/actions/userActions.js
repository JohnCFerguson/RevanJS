import axios from "axios";

import {
    USER_LIST,
    USERS_LOADING,
    GET_ERRORS
} from "./types";

// Get user list
export const getUsers = () => dispatch => {
    axios
        .get("/api/users/userList")
        .then(res => {
            console.log(res.data)
            dispatch({
                type: USER_LIST,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
};

// set user lists
// export const setUserList = users => {
//     return {
//         type: SET_USER_LIST,
//         payload: users
//     };
// };

// set users loading
export const setUsersLoading = () => {
    return {
        type: USERS_LOADING
    };
};