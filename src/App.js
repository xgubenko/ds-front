import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.tokenChangedHandler = this.tokenChangedHandler.bind(this)

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            tokenChanged: false,
            currentUser: undefined,
            accessToken: undefined,
            messageText: "",
            messageTag: "",
            loading: true
        };
    }

    componentDidMount() {

        const token = AuthService.getCurrentToken();

        if (token) {
            this.setState({
                accessToken: token
            })
        }

        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
                // accessToken: localStorage.getItem("accessToken")

            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //   this.setState({
    // accessToken: localStorage.getItem("accessToken")
    // })
    // }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    tokenChangedHandler = () => {
        console.log("KEK")
        // this.setState({
        //   tokenChanged: true
        // })
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //   this.setState({
    //     tokenChanged: false
    //   })
    // }

    logOut() {
        AuthService.logout();
        this.setState({
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            accessToken: undefined,
        });
    }

    render() {
        const {accessToken, currentUser, showModeratorBoard, showAdminBoard} = this.state;
        // const accessToken = localStorage.getItem('accessToken')
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        DevStack
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {showModeratorBoard && (
                            <li className="nav-item">
                                <Link to={"/mod"} className="nav-link">
                                    Moderator Board
                                </Link>
                            </li>
                        )}

                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>
                        )}

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}
                    </div>

                    {accessToken ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {/*{currentUser.username}*/}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    Logout
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        {/*<Route exact path="/login" component={Login} />*/}
                        <Route path="/register">
                            <Login tokenChangedHandler={this.tokenChangedHandler} kek={"kek"}/>
                        </Route>
                        <Route exact path="/profile" component={Profile}/>
                        <Route path="/user" component={BoardUser}/>
                        <Route path="/mod" component={BoardModerator}/>
                        <Route path="/admin" component={BoardAdmin}/>
                    </Switch>
                </div>

                <AuthVerify logOut={this.logOut}/>
            </div>
        );
    }
}

export default App;
