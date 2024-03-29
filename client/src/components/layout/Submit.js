import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions/userActions";
import { submitFeedback } from "../../actions/feedbackActions";

import Navbar from "./Navbar";

const mongoose = require("mongoose");

class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackFor: "",
            feedbackType: "CMS Post",
            feedback: "",
            deliveredInPerson: "",
            relatedLink: "",
            sentiment: "",
            users: {},
            errors: {}
        };
    };

    componentWillMount() {
        this.props.getUsers();
        this.setState({users: this.props.getUsers()});
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    onChange = e => {
        if(document.getElementById('blank')){
            document.getElementById('blank').remove()
        }

        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        let feedbackForObj;

        this.props.users.forEach(user => {
            if(user._id === this.state.feedbackFor){
                feedbackForObj = {
                    id: user._id,
                    name: user.name,
                    manager: user.manager
                };
            }
            else {
                return null;
            }
        })

        const deliveredByObj = {
            id: this.props.auth.user.id,
            name: this.props.auth.user.name,
            manager: this.props.auth.user.manager
        }

        const newFeedback = {
            feedbackFor: feedbackForObj,
            feedbackType: this.state.feedbackType,
            feedback: this.state.feedback,
            deliveredInPerson: this.state.deliveredInPerson,
            relatedLink: this.state.relatedLink,
            sentiment: this.state.sentiment,
            deliveredBy: deliveredByObj
        };


        this.props.submitFeedback(newFeedback, this.props.history);
    };

    render() {
        const { errors, feedbackFor, feedback, deliveredInPerson, sentiment, relatedLink  } = this.state
        const userSelect = <select
                                onChange={this.onChange}
                                value={this.state.feedbackFor}
                                id="feedbackFor"
                                className="form-control input-field"
                            >
                                <option key="blank" id="blank" value=""></option>
                                {
                                    this.props.users.map(user => {
                                        return <option key={ user._id } value={ user._id }>{ user.name }</option> })
                                }
                            </select>
        const submitEnabled = feedbackFor.length > 0 && feedback.length > 0 && feedback !==" " && deliveredInPerson.length > 0 && sentiment.length > 0 && relatedLink.length > 0;


        return (
            <div>
                <Navbar />
                <div style={{height: "50vh" }} className="container">
                    <div className="row">
                        <div className="col center-align">
                            <h2>Submit Feedback</h2>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col s6 float-left text-left userSelect">
                                        <label htmlFor="feedbackFor">Feedback for:
                                            { userSelect }
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-left">
                                        <label htmlFor="feedbackType">Feedback Type:
                                            <select
                                                onChange={this.onChange}
                                                value={this.state.feedbackType}
                                                id="feedbackType"
                                                error={errors.feedbackFor}
                                                className="form-control input-field"
                                            >
                                                <option key="cms">CMS Post</option>
                                                <option key="auth">Auth Flow</option>
                                                <option key="ticket">Ticket Work</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div className="float-left">
                                    <label htmlFor="feedbackType">Delivered in Person:</label>
                                    <p>
                                        <label className="float-left">
                                            <input
                                                id="deliveredInPerson"
                                                value="Yes"
                                                error={errors.deliveredInPerson}
                                                checked={this.state.deliveredInPerson === "Yes"}
                                                onChange={this.onChange}
                                                type="radio"
                                                className="with-gap"
                                            />
                                            <span>Yes</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label className="float-left">
                                            <input
                                                id="deliveredInPerson"
                                                value="No"
                                                error={errors.deliveredInPerson}
                                                checked={this.state.deliveredInPerson === "No"}
                                                onChange={this.onChange}
                                                type="radio"
                                                className="with-gap"
                                            />
                                            <span>No</span>
                                        </label>
                                    </p>
                                </div>
                                <div className="col s12 input-field text-left">
                                    <label htmlFor="relatedLink">Related Link:</label>
                                    <textarea
                                        id="relatedLink"
                                        className="materialize-textarea"
                                        name="relatedLink"
                                        onChange={this.onChange}
                                        value={this.state.relatedLink}
                                        error={errors.feedbackLink}
                                    ></textarea>
                                </div>
                                <div className="float-left">
                                    <label htmlFor="sentiment">Feedback Sentiment:</label>
                                    <p>
                                        <label className="float-left">
                                            <input
                                                id="sentiment"
                                                value="Positive"
                                                error={errors.sentiment}
                                                checked={this.state.sentiment === "Positive"}
                                                onChange={this.onChange}
                                                type="radio"
                                                className="with-gap"
                                            />
                                            <span>Positive</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label className="float-left">
                                            <input
                                                id="sentiment"
                                                value="Constructive"
                                                error={errors.sentiment}
                                                checked={this.state.sentiment === "Constructive"}
                                                onChange={this.onChange}
                                                type="radio"
                                                className="with-gap"
                                            />
                                            <span>Constructive</span>
                                        </label>
                                    </p>
                                </div>
                                <div className="col s12 input-field text-left feedback">
                                    <label htmlFor="feedback">Feedback:</label>
                                    <textarea
                                        id="feedback"
                                        className="materialize-textarea"
                                        name="feedback"
                                        onChange={this.onChange}
                                        value={this.state.feedback}
                                        error={errors.feedback}
                                    ></textarea>
                                </div>
                                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                    <button
                                        type="submit"
                                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                        disabled={!submitEnabled}
                                    >
                                    Submit Feedback
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Submit.propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    submitFeedback: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    users: state.users.users,
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getUsers, submitFeedback }
)(Submit);