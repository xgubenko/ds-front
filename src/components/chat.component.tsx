import React, {Component} from "react";
import ChatService from "../services/chat.service";
import UserService from "../services/user.service";

interface ChatState {
    messageTag: string,
    messageText: string,
    loading: boolean,
    content: [],
    messages: Message[],
    username: string
}

interface ChatProps {
}

interface Message {
    id: string,
    author: User,
    messageText: string,
    dateTime: string

}

interface User {
    username: string
    email: string
    isEnabled: boolean
}

export default class Chat extends Component<ChatProps, ChatState> {
    constructor(props: any) {
        super(props);

        this.onChangeMessageText = this.onChangeMessageText.bind(this);
        this.onChangeMessageTag = this.onChangeMessageTag.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.refreshMessages = this.refreshMessages.bind(this)

        this.state = {
            messageTag: '',
            messageText: '',
            loading: false,
            content: [],
            messages: [],
            username: ''
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
        this.refreshMessages()
    }

    componentDidMount() {

        setInterval(() => {
            UserService.getMessages().then(
                response => {
                    this.setState({
                        messages: response.data
                    });
                },
                error => {
                    this.setState({
                        messages:
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString()
                    });
                }
            )
        }, 5000)

        UserService.getUserInfo().then(
            response => {
                this.setState({
                    username: response.data.username
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );

        this.refreshMessages()
    }

    refreshMessages() {
        UserService.getMessages().then(
            response => {
                this.setState({
                    messages: response.data
                });
            },
            error => {
                this.setState({
                    messages:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div>
                <div className="container">
                    {this.state.username &&
                        <header className="jumbotron">
                            <div>
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
                                        <input type="submit" className="col btn btn-primary mb-2 mx-sm-2"
                                               value={"Send"}/>
                                    </form>
                                    <div>
                                        {
                                            this.state.messages.map(message => {
                                                    return <div key={message.id}>
                                                        <div className="card" style={{marginTop: 8}}>
                                                            <div className="form-row">
                                                                <div className="form-group col-md-2">
                                                                    <strong>{message.author.username}</strong>:
                                                                </div>
                                                                <div className="form-group col-md-9">
                                                                    {message.messageText}
                                                                </div>
                                                                <div className="form-group col-md-4">
                                                                    {message.dateTime.split('.')[0].split('T')[1] + " " +
                                                                        message.dateTime.split('.')[0].split('T')[0]}
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                }
                                            )}
                                    </div>
                                </div>
                            </div>
                        </header>
                    }
                </div>

            </div>
        );
    }
}
