import axios from "axios";

import history from "../../utils/constants";
const TOKEN_KEY = "jwt";
const USER_DATA = "user";

export function login() {
  return function (dispatch) {
    dispatch({ type: "LOGIN_LOADING" });
    return axios.get("https://reqres.in/api/users/2").then(({ data }) => {
      console.log("line 188=>", data);
      const userData = {
        access: {
          read: true,
          add: false,
          edit: false,
          delete: false,
        },
        modules: [
          { name: "dashboard", icon: "fa fa-home" },
          { name: "contact", icon: "fa fa-phone" },
        ],
      };
      alert("Logged in");
      localStorage.setItem(TOKEN_KEY, "TestLogin");
      localStorage.setItem(USER_DATA, JSON.stringify(userData));
      if (isLogin()) {
        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
        history.push("/");
      } else {
        history.push("/login");
      }
      // return userData;
    });
  };
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  return true;
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};
