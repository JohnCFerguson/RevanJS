import {
    USER_LIST,
    USERS_LOADING
} from "../actions/types";

const initialStore = {
    users: [],
    user: {},
    loading: false
};

export default function (state = initialStore, action) {
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
        default:
            return state;
    }
};