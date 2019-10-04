import axios from "axios";

import {
    FEEDBACK_LIST,
    FEEDBACK_COUNT,
    FEEDBACK_TYPE_COUNT,
    FEEDBACK_DELIVERED_COUNT,
    FEEDBACK_SENTIMENT_COUNT,
    FEEDBACK_SUBMITTED_BY_COUNT,
    FEEDBACK_SUBMITTED_FOR_COUNT,
    FEEDBACK_SUBMITTED_FOR_TEAM_COUNT,
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
            console.log(res.data)
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

// get feedback count by submitter
export const getSubmittedByUserCount = () => dispatch => {
    axios
        .get("/api/feedback/feedbackSubmittedByCount")
        .then(res => {
            dispatch(feedbackSubmittedByCount(res.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};

// get feedback count by user
export const getSubmittedForUserCount = () => dispatch => {
    axios
        .get("/api/feedback/feedbackSubmittedForCount")
        .then(res => {
            dispatch(feedbackSubmittedForCount(res.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};

// get feedback count by user
export const getSubmittedForTeamCount = () => dispatch => {
    axios
        .get("/api/feedback/feedbackSubmittedForTeamCount")
        .then(res => {
            dispatch(feedbackSubmittedForTeamCount(res.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};

// get feedback count
export const getFeedbackCount = () => dispatch => {
    axios
        .get("/api/feedback/feedbackCount")
        .then(res => {
            dispatch(feedbackCount(res.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};

// get feedback type count
export const getFeedbackTypeCount = () => dispatch => {
    axios
        .get("/api/feedback/feedbackTypeCount")
        .then(res => {
            dispatch(feedbackTypeCount(res.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};


// get feedback type count
export const getDeliveredInPersonCount = () => dispatch => {
    axios
        .get("/api/feedback/feedbackDeliveredCount")
        .then(res => {
            dispatch(feedbackDeliveredCount(res.data));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};

// get feedback type count
export const getSentimentCount = () => dispatch => {
    axios
        .get("/api/feedback/feedbackSentimentCount")
        .then(res => {
            dispatch(feedbackSentimentCount(res.data));
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

// set feedback count
export const feedbackCount = feedback => {
    return {
        type: FEEDBACK_COUNT,
        payload: feedback
    }
}

// set feedbackType count
export const feedbackTypeCount = feedback => {
    return {
        type: FEEDBACK_TYPE_COUNT,
        payload: feedback
    }
}

// set feedback Delivered in person count
export const feedbackDeliveredCount = feedback => {
    return {
        type: FEEDBACK_DELIVERED_COUNT,
        payload: feedback
    }
}

// set feedback sentiment count
export const feedbackSentimentCount = feedback => {
    return {
        type: FEEDBACK_SENTIMENT_COUNT,
        payload: feedback
    }
}

// set feedback sentiment count
export const feedbackSubmittedByCount = feedback => {
    return {
        type: FEEDBACK_SUBMITTED_BY_COUNT,
        payload: feedback
    }
}

// set feedback sentiment count
export const feedbackSubmittedForCount = feedback => {
    return {
        type: FEEDBACK_SUBMITTED_FOR_COUNT,
        payload: feedback
    }
}

// set feedback sentiment count
export const feedbackSubmittedForTeamCount = feedback => {
    return {
        type: FEEDBACK_SUBMITTED_FOR_TEAM_COUNT,
        payload: feedback
    }
}