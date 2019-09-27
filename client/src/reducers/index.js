import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import userReducers from "./userReducers";
import feedbackReducers from "./feedbackReducers";

export default combineReducers({
    users: userReducers,
    feedback: feedbackReducers,
    auth: authReducer,
    errors: errorReducer
});