import React, {Component} from "react";
import HomepageMainWelcome from "../components/homepage-main-welcome";
import HomepageSecondaryWelcome from "../components/homepage-secondary-welcome";

export default class HomePage extends Component {
    constructor(props: any) {
        super(props);

        this.state = {
            content: [],
            messages: [],
            username: "",
        };
    }

    render() {
        return (
            <main role="main">
                <HomepageMainWelcome/>

                <div className="container">
                    <div className="row">

                        <HomepageSecondaryWelcome heading="Communicate"
                                                  link="#"
                                                  buttonText="Join &raquo;"
                                                  contentText="Software development is a challenging field. It’s almost impossible to succeed in it without having some sort of support system. Communities help developers connect with others who share the same experience, failures, and successes within the industry."
                        />
                        <HomepageSecondaryWelcome heading="Explore"
                                                  link="#"
                                                  buttonText="Start learning &raquo;"
                                                  contentText="Learning to code — or thinking about learning? Check out our collection of articles about how to get started, tips for staying motivated, and more. Learn About Hardware, Software, Internet, Infrastructure, IT Security and Networking. Choose from many topics, skill levels, and languages."
                        />
                        <HomepageSecondaryWelcome heading="Find a job"
                                                  link="#"
                                                  buttonText="View postings &raquo;"
                                                  contentText="With Devstack, you can search full or part-time jobs online to find the next step in your career. With tools for job search, resumes, company reviews and more. Get the job you want by researching employers, using the right keywords to filter job search results and improving your networking skills.
"
                        />
                    </div>
                    <hr/>
                </div>
            </main>
        );
    }
}


