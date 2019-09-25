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

export const getFeedback = (feedback) => dispatch => {
    console.log(feedback);
    axios
        .post("/api/feedback/feedbackList", feedback)
        .then(res => {
            dispatch({
                type: FEEDBACK_LIST,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
};