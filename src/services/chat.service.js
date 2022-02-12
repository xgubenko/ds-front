import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080/';


class ChatService {
    sendMessage(messageText, messageTag) {

        console.log(messageText + messageTag)

        return axios
            .post(API_URL + "message", {
                messageText,
                messageTag
            }, { headers: authHeader() })
            .then(response => {
                // if (response.headers.authorization) {
                //     localStorage.setItem("accessToken", response.headers.authorization);
                // }

                return response.data;
            });
    }
}

export default new ChatService();