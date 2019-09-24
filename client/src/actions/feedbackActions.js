import axios from "axios";

import {
    NEW_FEEDBACK,
    GET_ERRORS
} from "./types";

// submit new feedback
export const submitFeedback = (feedbackData, history) => dispatch => {
    axios
        .post("/api/feedback/submit", feedbackData)
        .then(
            dispatch({
                type: NEW_FEEDBACK,
                feedbackFor: feedbackData.feedbackFor,
                feedback: feedbackData.feedback
            })
        )
        .then(
            res => 
                dispatch(
                    history.push('/dashboard')
                )
            ); //redirects to login once successfully registered
};