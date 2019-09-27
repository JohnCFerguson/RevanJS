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
        .post("/api/feedback/feedbackListFor", feedbackFor)
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

// get feedback delivered by
export const getFeedbackBy = (feedbackBy) => dispatch => {
    console.log(feedbackBy)
    axios
        .post("/api/feedback/feedbackListBy", feedbackBy)
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

// get feedback for team by manager
export const getFeedbackByManager = (manager) => dispatch => {
    axios
        .post("/api/feedback/feedbackListByManager", manager)
        .then(res => {
            dispatch(setTeamFeedback(res.data));
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


// set feedback for team
export const setTeamFeedback = feedback => {
    return {
        type: FEEDBACK_LIST,
        payload: feedback
    };
};