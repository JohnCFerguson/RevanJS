import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions/userActions";
import { submitFeedback } from "../../actions/feedbackActions";


import Navbar from "../layout/Navbar";

class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackFor: "",
            feedback: "",
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
                feedbackForObj = user;
            }
            else {
                return null;
            }
        });

        const newFeedback = {
            feedbackFor: feedbackForObj,
            feedback: this.state.feedback
        };


        this.props.submitFeedback(newFeedback, this.props.history);
    };

    render() {
        const userSelect = <select
                                onChange={this.onChange}
                                value={this.state.feedbackFor}
                                id="feedbackFor"
                                className="form-control">
                                <option key="blank" id="blank" value=""></option>
                                {
                                                    this.props.users.map(user => {
                                                        return <option key={ user._id } value={ user._id }>{ user.name }</option> })
                                                }
                            </select>

        return (
            <div>
                <Navbar />
                <div style={{height: "50vh" }} className="container valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h2>Submit Feedback</h2>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="col s12 text-left userSelect">
                                <label htmlFor="feedbackFor">Feedback for:</label>
                                    { userSelect }
                                </div>
                                <br />
                                <div className="col l12 text-left feedback">
                                    <label htmlFor="feedback">Feedback:</label>
                                    <br/>
                                    <textarea 
                                        id="feedback" 
                                        className="materialize-textarea" 
                                        name="feedback"
                                        onChange={this.onChange}
                                        value={this.state.feedback}
                                    ></textarea>
                                </div>
                                <br/>
                                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                    <button
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
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