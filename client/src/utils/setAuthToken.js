import axios from "axios";

const setAuthToken = token => {
    if (token) {
        // Apply auth token to every request if isAuthorized (logged in)
        axios.defaults.headers.common["Authorization"] = token;
    }
    else {
        // Delete auth header when !isAuthorized (not logged in)
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;