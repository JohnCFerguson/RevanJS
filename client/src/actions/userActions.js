import axios from "axios";

import {
    USER_LIST,
    USERS_LOADING,
    MANAGER_LIST,
    MANAGERS_LOADING,
    GET_ERRORS
} from "./types";

// Get user list
export const getUsers = () => dispatch => {
    axios
        .get("/api/users/userList")
        .then(res => {
            dispatch(userList(res.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
};

// Get user list
export const getManagers = () => dispatch => {
    axios
        .get("/api/users/managerList")
        .then(res => {
            console.log(res.data)
            dispatch(managerList(res.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
};

// returns user lists
export const userList = users => {
    return {
        type: USER_LIST,
        payload: users
    };
};

// returns manager lists
export const managerList = managers => {
    console.log(managers)
    return {
        type: MANAGER_LIST,
        payload: managers
    };
};

// set users loading
export const usersLoading = () => {
    return {
        type: USERS_LOADING
    };
};

// set users loading
export const managersLoading = () => {
    return {
        type: MANAGERS_LOADING
    };
};