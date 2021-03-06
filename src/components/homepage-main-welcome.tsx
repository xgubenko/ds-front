import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";

class HomepageMainWelcome extends React.Component<RouteComponentProps<any, any>> {
    constructor(props: any) {
        super(props);

        this.state = {
        };
    }

    render() {
        const accessToken = localStorage.getItem("accessToken")

        return (
                <div className="jumbotron">
                    <div className="condtainer">
                        <h1 className="display-3">Hello, Developer!</h1>
                        <p>DevStack is dedicated to learning the Information Technology and building the community of engineers.</p>
                        {accessToken &&
                            <p className="btn btn-primary btn-lg" onClick={() => this.props.history.push("/profile")} role="button">
                                Set up my profile &raquo;
                            </p>}
                        {!accessToken &&
                            <p className="btn btn-primary btn-lg" onClick={() => this.props.history.push("/login")} role="button">
                                Login to access all features &raquo;
                            </p>}
                    </div>
                </div>
        );
    }
}

export default withRouter(HomepageMainWelcome)
