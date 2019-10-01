import {
    NEW_FEEDBACK,
    FEEDBACK_LIST,
    FEEDBACK_COUNT,
    FEEDBACK_TYPE_COUNT,
    FEEDBACK_DELIVERED_COUNT,
    FEEDBACK_SENTIMENT_COUNT,
    FEEDBACK_SUBMITTED_BY_COUNT
} from "../actions/types";

const initialState = {
    feedback: [],
    feedbackType: {},
    deliveredInPerson: {},
    sentiment: {},
    submittedByUser: {},
    loading: false
};

export default function (state = initialState, action) {
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
        case FEEDBACK_COUNT:
            return {
                ...state,
                feedback: action.payload
            }
        case FEEDBACK_TYPE_COUNT:
            return {
                ...state,
                feedbackType: action.payload
            }
        case FEEDBACK_DELIVERED_COUNT:
            return{
                ...state,
                deliveredInPerson: action.payload
            }
        case FEEDBACK_SENTIMENT_COUNT:
            return{
                ...state,
                sentiment: action.payload
            }
        case FEEDBACK_SUBMITTED_BY_COUNT:
            return{
                ...state,
                submittedByUser: action.payload
            }
        default:
            return state;
    }
};