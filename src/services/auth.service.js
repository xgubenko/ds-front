import axios from "axios";

// const API_URL = "https://devstack-info.herokuapp.com/";
const API_URL = 'http://localhost:8080/';

class AuthService {
  login(username, password) {
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
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getCurrentToken() {
    return localStorage.getItem('accessToken');
  }
}

export default new AuthService();
