import React, {Component} from "react";

import UserService from "../services/user.service";
import Chat from "./../components/chat.component";
import ChatService from "../services/chat.service";

interface ChatPageState {
    content: [],
    username: string,
}




export default class ChatPage extends Component<{}, ChatPageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            content: [],
            username: "",
        };
    }


    render() {
        return (
                                <Chat/>
        );
    }
}

