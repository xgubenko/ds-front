import React, { Component } from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

class AuthVerify extends Component<RouteComponentProps> {
  constructor(props: any) {
    super(props);

    props.history.listen(() => {
      const token = JSON.parse(localStorage.getItem("accessToken") as string);

      if (token) {
        const decodedJwt = parseJwt(token);

        if (decodedJwt.exp * 1000 < Date.now()) {
          props.logOut();
        }
      }
    });
  }

  render() {
    return <div></div>;
  }
}

export default withRouter(AuthVerify);
