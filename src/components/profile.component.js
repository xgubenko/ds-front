import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import UserService from "../services/user.service";
import styles from "./profile.component.css"

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {},
            username: "",
            image: "",
            needUpdate: false,
        };

        this.uploadAvatar = this.uploadAvatar.bind(this)
        this.needUpdate = this.needUpdate.bind(this)
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.state.needUpdate === true){
    //         console.log("UPDATE")
    //         this.setState({needUpdate: false})
    //         return true;
    //     }
    //     console.log("NO UPDATE")
    //     return false;
    // }

    componentDidMount() {
        if (this.state.image === "") {
            UserService.getUserAvatar()
        }

        UserService.getUserInfo().then(
            response => {
                this.setState({
                    currentUser: response.data
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

        this.setState({
            userReady: true,
            image: localStorage.getItem("profileImage"),
            needUpdate: true,
        })
    }

    needUpdate() {
        this.setState({needUpdate: true})
    }

    uploadAvatar(event) {
        if (event.target.files && event.target.files[0]) {
            let image = event.target.files[0];
            UserService.uploadUserAvatar(image)
            this.needUpdate()
        }
    }

    render() {
        const {currentUser} = this.state;
        if (!currentUser) {
            this.setState({redirect: "/home"});
        }

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }


        return (

            <div className="container">
                {(this.state.userReady) ?
                    <div>

                        <header className="jumbotron">
                            <div className="parent">
                                <div className="div1">
                                    <h3>
                                        <strong>{currentUser.username}</strong>
                                    </h3>
                                </div>
                                <div className="div2">
                                    <h4>
                                        Contact
                                    </h4>
                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {currentUser.email}
                                    </p>
                                </div>
                                <div className="div3">

                                </div>
                                <div className="div4"></div>
                                <div className="div5"></div>
                                <div className="div6">
                                    {this.state.image ? <img className="rounded"
                                         style={{width: 150, height: 150, objectFit: "cover", display: "inline-block"}}
                                         src={`data:image/jpeg;base64,` + this.state.image} alt={"Profile image"}/> :
                                        <label className="btn btn-primary" style={{
                                            display: "inline-block",
                                            alignSelf: "flex-end"
                                        }}>{this.state.image ? "Change image" : "Upload image"}
                                            <input type="file" onChange={this.uploadAvatar}
                                                   style={{display: "none"}}></input>
                                        </label>
                                    }

                                </div>
                                <div className="div7">
                                    {this.state.image && <label className="btn btn-primary" style={{
                                        display: "inline-block",
                                        alignSelf: "flex-end"
                                    }}>Change image
                                        <input type="file" onChange={this.uploadAvatar}
                                               style={{display: "none"}}></input>
                                    </label>}
                                </div>
                            </div>


                        </header>
                        <p>

                        </p>

                    </div> : null}
            </div>
        );
    }
}
