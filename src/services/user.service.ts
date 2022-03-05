import axios from 'axios';
import authHeader from './auth-header';
import {API_URL} from "./constants";
import {appendFile} from "fs";

class UserService {

    getUserInfo() {
        return axios.get(API_URL + 'info/user', {headers: authHeader()});
    }

    getMessages() {
        return axios.get(API_URL + 'message', {headers: authHeader()});
    }

    getUserAvatar() {
        axios.get(API_URL + 'info/image', {headers: authHeader()})
            .then(
            response =>{
                localStorage.setItem("profileImage", response.data)
            })
        //         let urlCreator = window.URL || window.webkitURL;
        //         let image = urlCreator.createObjectURL(response.data);
        //         const buffer = Buffer.from(response.data)
        //         localStorage.setItem("profileImage", buffer
        //         );
        //     }
        // );
    }

    uploadUserAvatar(picture: string) {
        let data = new FormData()
        data.append('image', picture)
        axios.post(API_URL + 'info/image', data, {headers: {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}})

        localStorage.setItem("profileImage", picture)
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', {headers: authHeader()});
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', {headers: authHeader()});
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', {headers: authHeader()});
    }
}

export default new UserService();
