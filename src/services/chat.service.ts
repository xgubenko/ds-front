import axios from "axios";
import authHeader from "./auth-header";
import {API_URL} from "./constants";

class ChatService {
    sendMessage(messageText: string, messageTag: string) {

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
