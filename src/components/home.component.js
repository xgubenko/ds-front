import React, {Component} from "react";

import UserService from "../services/user.service";
import Chat from "./chat.component";


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            messages: [],
        };
    }

    componentDidMount() {
        UserService.getUserInfo().then(
            response => {
                this.setState({
                    content: response.data
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
        let username = this.state.content.username;
        let email = this.state.content.email;
        let enabled = String(this.state.content.isEnabled)

        return (
            <div>
            <div className="container">
                {username &&


                    <header className="jumbotron">
                        {/*<h3>Hello {username}!</h3>*/}
                        {/*<h3>User email: {email}</h3>*/}
                        {/*<h3>User enabled: {enabled}</h3>*/}
                        <div>
                            <h1 className="display-4" style={{padding: 20}}>Welcome to our chat!</h1>

                            <Chat/>

                            <div>
                                {
                                    this.state.messages.map(message => {
                                        return <div>
                                            <div className="card" style={{marginTop: 8}}>
                                            <div className="form-row">
                                                <div className="form-group col-md-2">
                                                    {message.author.username}:
                                                </div>
                                                <div className="form-group col-md-9">
                                                    {message.messageText}
                                                </div>
                                                <div className="form-group col-md-1">
                                                    <i>{"Tags: " + message.tag}</i>
                                                </div>
                                                <div className="form-group col-md-4">
                                                    { message.dateTime.split('.')[0].split('T')[1] + " " +
                                                        message.dateTime.split('.')[0].split('T')[0]}
                                                </div>

                                            </div>
                                            </div>
                                        </div>

                                    }

                                    )}
                            </div>
                        </div>
                    </header>
                }
            </div>

            </div>

        );
    }
}

