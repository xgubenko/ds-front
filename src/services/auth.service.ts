import axios from "axios";
import {API_URL} from "./constants";

class AuthService {
  login(username: string, password: string) {

    username = username.toLowerCase()

    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.headers.authorization) {
          localStorage.setItem("accessToken", response.headers.authorization);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("profileImage")
  }

  register(username: string, email: string, password: string) {

    username = username.toLowerCase()
    email = email.toLowerCase()

    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') as string);
  }

  getCurrentToken() {
    return localStorage.getItem('accessToken');
  }
}

export default new AuthService();
