import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import userReducers from "./userReducers";
import feedbackReducers from "./feedbackReducers";
import managerReducer from "./managerReducer";

export default combineReducers({
    users: userReducers,
    managers: managerReducer,
    feedback: feedbackReducers,
    auth: authReducer,
    errors: errorReducer
});