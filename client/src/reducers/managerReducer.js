import {
    MANAGER_LIST,
    MANAGERS_LOADING
} from "../actions/types";

const initialState = {
    managers: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case MANAGER_LIST:
                return {
                    ...state,
                    users: [],
                    managers: action.payload
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