import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import ChatService from "../services/chat.service";
import CheckButton from "react-validation/build/button";


export default class Chat extends Component {
    constructor(props) {
        super(props);

        this.onChangeMessageText = this.onChangeMessageText.bind(this);
        this.onChangeMessageTag = this.onChangeMessageTag.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.state = {
            messageTag: '',
            messageText: '',
        };
    }

    onChangeMessageText(e) {
        this.setState({messageText: e.target.value})
    }

    onChangeMessageTag(e) {
        this.setState({messageTag: e.target.value})
    }

    sendMessage(e) {
        e.preventDefault();
        console.log(this.state.messageText)
        console.log(this.state.messageTag)
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

                <Form style={{marginBottom: 30}}  className="form-row" onSubmit={this.sendMessage} ref={c => {
                    this.form = c;
                }}>
                    <p className="lead">Leave a message here: </p>
                    <div className="col col-md-6 mx-sm-3 mb-2">
                        <Input
                            placeholder="Message"
                            type="text"
                            className="form-control"
                            name="messageText"
                            value={this.state.messageText}
                            onChange={this.onChangeMessageText}/>
                    </div>

                    <div className="col mx-sm-3 mb-2">
                        <Input
                            placeholder="Tag"
                            type="text"
                            className="form-control"
                            name="messageTag"
                            value={this.state.messageTag}
                            onChange={this.onChangeMessageTag}
                            // validations={[required]}
                        />
                    </div>
                    <button className="col btn btn-primary mb-2">
                        <span>Send</span>
                    </button>

                </Form>

            </div>


        );
    }

}
