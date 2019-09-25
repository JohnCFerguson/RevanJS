import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";

// Register user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => history.push("/login")) //redirects to login once successfully registered
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login user - gets user's token
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            //Save to localStorage

            // set Token to LocalStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token)
            // set token to AuthHeader
            setAuthToken(token);
            // decode token to get user's data
            const decoded = jwt_decode(token);
            // set current user to logged in user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// set Logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading...
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token fom localstore
    localStorage.removeItem("jwtToken");
    // Remove AuthHeader for future requests
    setAuthToken(false);
    //set current user to empty, isAuthenticated = false
    dispatch(setCurrentUser({}));
};