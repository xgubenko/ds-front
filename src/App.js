import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import HomePage from "./pages/HomePage";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import ChatPage from "./pages/ChatPage";

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

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    tokenChangedHandler = () => {
        if (this.state.tokenChanged !== true) {
            this.setState({
                tokenChanged: true,
                accessToken: localStorage.getItem("accessToken")
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.tokenChangedHandler()
    }


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

        return (
            <div>

                <nav className="navbar navbar-expand navbar-dark bg-dark">

                    <Link to={"/"} className="navbar-brand">
                        DevStack
                    </Link>
                    <div className="navbar-nav mr-auto">
                        {accessToken ?
                            <li className="nav-item">
                                <Link to={"/chat"} className="nav-link">
                                    Chat
                                </Link>
                            </li> :
                            <li className="nav-item">
                                <Link to={"/chat"} className="nav-link disabled">
                                    Chat
                                </Link>
                            </li>
                        }
                        {accessToken && <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {/*{currentUser.username}*/}
                                Profile
                            </Link>
                        </li>}
                        <li className="nav-item">
                            <Link to={"/about"} className="nav-link disabled">
                                {/*{currentUser.username}*/}
                                Articles
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/about"} className="nav-link disabled">
                                {/*{currentUser.username}*/}
                                Jobs
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/about"} className="nav-link disabled">
                                {/*{currentUser.username}*/}
                                About
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/about"} className="nav-link disabled">
                                {/*{currentUser.username}*/}
                                JWT
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/about"} className="nav-link disabled">
                                {/*{currentUser.username}*/}
                                Regexp
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/about"} className="nav-link disabled">
                                {/*{currentUser.username}*/}
                                Questions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/about"} className="nav-link disabled">
                                {/*{currentUser.username}*/}
                                Notes
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/about"} className="nav-link disabled">
                                {/*{currentUser.username}*/}
                                Todos
                            </Link>
                        </li>

                        {/*{showModeratorBoard && (*/}
                        {/*    <li className="nav-item">*/}
                        {/*        <Link to={"/mod"} className="nav-link">*/}
                        {/*            Moderator Board*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*)}*/}

                        {/*{showAdminBoard && (*/}
                        {/*    <li className="nav-item">*/}
                        {/*        <Link to={"/admin"} className="nav-link">*/}
                        {/*            Admin Board*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*)}*/}

                        {/*{currentUser && (*/}
                        {/*    <li className="nav-item">*/}
                        {/*        <Link to={"/user"} className="nav-link">*/}
                        {/*            User*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*)}*/}
                    </div>


                    {accessToken ? (
                        <div className="navbar-nav ml-auto">

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
                        <Route exact path={["/"]} component={HomePage}/>
                        <Route exact path={"/chat"} component={ChatPage}/>
                        <Route exact path="/login"
                               render={() => <Login tokenChangedHandler={this.tokenChangedHandler}/>}/>
                        <Route path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/about" component={Profile}/>
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
