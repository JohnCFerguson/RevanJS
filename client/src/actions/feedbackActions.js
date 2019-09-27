import axios from "axios";

import {
    FEEDBACK_LIST,
    GET_ERRORS
} from "./types";

// submit new feedback
export const submitFeedback = (feedbackData, history) => dispatch => {
    axios
        .post("/api/feedback/submit", feedbackData)
        .then(res => history.push("/dashboard")) //redirects to login once successfully registered
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// get feedback for user (tra or manager)
export const getFeedbackForTra = (feedbackFor) => dispatch => {
    axios
        .post("/api/feedback/feedbackList", feedbackFor)
        .then(res => {
            dispatch(setUserFeedback(res.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};

// get feedback by tra or manager
export const getFeedbackBy = (feedbackBy) => dispatch => {
    axios
        .post("/api/feedback/feedbackListFor", feedbackBy)
        .then(res => {
            dispatch(setUserFeedback(res.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};


// set feedback for user
export const setUserFeedback = feedback => {
    return {
        type: FEEDBACK_LIST,
        payload: feedback
    };
};