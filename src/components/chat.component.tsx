import React, {Component} from "react";
import ChatService from "../services/chat.service";

interface ChatState {
    messageTag: string,
    messageText: string,
    loading: boolean,
}
export default class Chat extends Component<{}, ChatState> {
    constructor(props: any) {
        super(props);

        this.onChangeMessageText = this.onChangeMessageText.bind(this);
        this.onChangeMessageTag = this.onChangeMessageTag.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.state = {
            messageTag: '',
            messageText: '',
            loading: false,
        };
    }

    onChangeMessageText(e: any) {
        this.setState({messageText: e.target.value})
    }

    onChangeMessageTag(e: any) {
        this.setState({messageTag: e.target.value})
    }

    sendMessage(e: any) {
        e.preventDefault();
        ChatService.sendMessage(this.state.messageText, this.state.messageTag);

        this.setState({
            messageText: "",
            messageTag: "",
            loading: true
        });

    }

    render() {
        return (
            <div>
                <form style={{marginBottom: 30}} className="form-row" onSubmit={this.sendMessage}>
                    <div className="col col-md-10 mx-sm-3 mb-2">
                        <input
                            placeholder="Message"
                            type="text"
                            className="form-control"
                            name="messageText"
                            value={this.state.messageText}
                            onChange={this.onChangeMessageText}/>
                    </div>
                    <input type="submit" className="col btn btn-primary mb-2 mx-sm-2" value={"Send"}/>
                </form>
            </div>
        );
    }
}
