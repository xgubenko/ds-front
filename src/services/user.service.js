import axios from 'axios';
import authHeader from './auth-header';
import {API_URL} from "./constants";

class UserService {

  getUserInfo() {
    return axios.get(API_URL + 'info/user', { headers: authHeader() });
  }
  getMessages() {
    return axios.get(API_URL + 'message', { headers: authHeader() });
  }

  getPublicContent() {
    return axios.get(API_URL + 'api/v1/students/1', { headers: authHeader() });
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
