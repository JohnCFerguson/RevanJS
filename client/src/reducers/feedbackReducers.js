import {
    NEW_FEEDBACK,
    FEEDBACK_LIST
} from "../actions/types";

const initialStore = {
    feedback: {},
    loading: false
};

export default function (state = initialStore, action) {
    switch (action.type) {
        case NEW_FEEDBACK:
            return {
                ...state,
                feedback: action.payload
            };
        case FEEDBACK_LIST:
            return {
                ...state,
                feedback: action.payload
            }
        default:
            return state;
    }
};