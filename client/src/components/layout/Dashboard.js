import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Navbar from "./Navbar";
import Submitted from "./charts/Submitted";
import FeedbackType from "./charts/FeedbackType";
import DeliveredInPerson from "./charts/DeliveredInPerson";
import Sentiment from "./charts/Sentiment";
import SubmittedByUser from "./charts/SubmittedByUser";
import SubmittedForUser from "./charts/SubmittedForUser";
import SubmittedForTeam from "./charts/SubmittedForTeam";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <div>
                <Navbar />
                <div style={{height: "75vh" }} className="container">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h4>
                                <b>Hey There,</b> { user.name.split(" ")[0] }
                                <p className="">
                                    This is your feedback Dashboard
                                </p>
                            </h4>
                        </div>
                    </div>
                    <div className="row d-flex">
                        <div className="col dashboard">
                            <Submitted />
                        </div>
                        <div className="col dashboard">
                            <FeedbackType />
                        </div>
                        <div className="col dashboard">
                            <DeliveredInPerson />
                        </div>
                        <div className="col dashboard">
                            <Sentiment />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col dashboard">
                            <SubmittedForUser />
                        </div>
                        <div className="col dashboard">
                            <SubmittedByUser />
                        </div>
                        <div className="col dashboard">
                            <SubmittedForTeam />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);