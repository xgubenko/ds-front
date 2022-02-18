import React from "react";
import {withRouter} from "react-router-dom";

class HomepageSecondaryWelcome extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
        };
    }

    render() {
        const {heading, contentText, buttonText, link} = this.props

        return (
            <div className="col-md-4">
                <h2>{heading}</h2>
                <p>{contentText}</p>
                <p><a className="btn btn-secondary" href={link} role="button">{buttonText}</a></p>
            </div>
        );
    }
}

export default withRouter(HomepageSecondaryWelcome)
