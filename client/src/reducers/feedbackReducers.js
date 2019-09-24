import {
    NEW_FEEDBACK,
    FEEDBACK_LIST
} from "../actions/types";

const initialStore = {
    users: [],
    user: {},
    loading: false
};

export default function (state = initialStore, action) {
    switch (action.type) {
        case NEW_FEEDBACK:
            return {
                ...state,
                feedbackFor: action.payload.feedbackFor,
                feedback: action.payload.feedback
            };
        case FEEDBACK_LIST:
            return state
        default:
            return state;
    }
};