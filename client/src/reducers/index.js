import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import userReducers from "./userReducers";

export default combineReducers({
    users: userReducers,
    auth: authReducer,
    errors: errorReducer
});