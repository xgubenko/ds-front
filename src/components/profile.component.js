import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserService from "../services/user.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: {},
      username: ""
    };
  }

  componentDidMount() {
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
    this.setState({ userReady: true })

  }

  render() {
    const { currentUser } = this.state;

    if (!currentUser) {this.setState({ redirect: "/home" });}

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    // console.log(this.state)

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          {/*<strong>Token:</strong>{" "}*/}
          {/*{currentUser.accessToken.substring(0, 20)} ...{" "}*/}
          {/*{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}*/}
        </p>
        {/*<p>*/}
        {/*  <strong>Id:</strong>{" "}*/}
        {/*  {currentUser.id}*/}
        {/*</p>*/}
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        {/*<ul>*/}
        {/*  {currentUser.roles &&*/}
        {/*    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}*/}
        {/*</ul>*/}
      </div>: null}
      </div>
    );
  }
}
