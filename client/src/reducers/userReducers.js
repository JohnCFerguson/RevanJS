import {
    USER_LIST,
    USERS_LOADING,
    MANAGER_LIST,
    MANAGERS_LOADING
} from "../actions/types";

const initialState = {
    users: [],
    user: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LIST:
            return {
                ...state,
                users: action.payload
            };
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            };
        case MANAGER_LIST:
            return {
                ...state,
                users: action.payload
            };
        case MANAGERS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};