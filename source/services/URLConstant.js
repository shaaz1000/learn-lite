const API_Path = {
    BASE_URL: "https://www.learnlite.in/api/",
    //BASE_URL: "https://edulite.com360degree.com/api/",
};

const APIService = {
    LOGIN: API_Path.BASE_URL + "log_in",
    LOGOUT: API_Path.BASE_URL + "logout",
    GET_STATE: API_Path.BASE_URL + "getstates",
    GET_CITY: API_Path.BASE_URL + "getcity",
    UPDATE_PROFILE: API_Path.BASE_URL + "update_profile",
    SUBSCRIPTION: API_Path.BASE_URL + "subscription",
    addParentStudent:API_Path.BASE_URL + "addParentStudent"
}
export default APIService