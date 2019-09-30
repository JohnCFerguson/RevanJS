import {
    USER_LIST,
    USERS_LOADING,
} from "../actions/types";

const initialState = {
    users: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LIST:
            console.log(initialState, action.payload)
            return {
                ...state,
                users: action.payload
            };
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};