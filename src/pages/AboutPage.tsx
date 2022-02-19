import React, {Component} from "react";
import HomepageMainWelcome from "../components/homepage-main-welcome";
import HomepageSecondaryWelcome from "../components/homepage-secondary-welcome";

export default class AboutPage extends Component {
    constructor(props: any) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h3 className={"display-4"}>
                        About DevStack
                    </h3>
                    <p className={"lead"}>
                        Software development is a challenging field. It’s almost impossible to succeed in it without having some sort of support system.
                        We create communities that help developers connect with others who share the same experience, failures, and successes within the industry.
                    </p>
                    <p className={"lead"}>
                        Learning to code — or thinking about learning? Check out our collection of articles about how to
                        get started, tips for staying motivated, and more.
                        Learn About Hardware, Software, Internet, Infrastructure, IT Security and Networking.
                        Choose from many topics, skill levels, and languages.
                    </p>
                    <p className={"lead"}>
                        With Devstack, you can search full or part-time jobs online to find the next step in your
                        career. With tools for job search, resumes, company reviews and more.
                        Get the job you want by researching employers, using the right keywords to filter job search
                        results and improving your networking skills
                    </p>
                    <div>
                    </div>
                </header>

            </div>
        );
    }
}


