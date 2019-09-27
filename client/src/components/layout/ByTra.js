import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions/userActions";
import { getFeedbackBy } from "../../actions/feedbackActions";


import Navbar from "./Navbar";

class ByTRA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveredBy: "",
            users: {},
            dateFrom: Date.now,
            feedback:[]
        };
    };

    componentDidMount() {
        this.setState({users: this.props.getUsers()});
        console.log(this.state);
        this.setState({feedback: []})
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.feedback !== this.props.feedback && nextProps.feedback !== undefined) {
            this.setState({
                feedback: nextProps.feedback.feedback
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

        let deliveredByObj;

        this.props.users.forEach(user => {
            if(user._id === this.state.deliveredBy){
                deliveredByObj = {
                    id: user._id,
                    name: user.name
                };
            }
            else {
                return null;
            }
        });

        console.log(deliveredByObj)

        const feedback = {
            deliveredBy: deliveredByObj,
            from: this.state.dateFrom
        }

        this.props.getFeedbackBy(feedback);
    };

    render() {
        const feedback = this.state.feedback;
        const userSelect = <select
                                onChange={this.onChange}
                                value={this.state.feedbackFor}
                                id="deliveredBy"
                                className="form-control input-field"
                            >
                                <option key="blank" id="blank" value=""></option>
                                {
                                    this.props.users.map(user => {
                                        return <option key={ user._id } value={ user._id }>{ user.name }</option> })
                                }
                            </select>;
        let feedbackShow;
        if(feedback.length > 0){
            feedbackShow = feedback.map(item => {
                return <div key={item._id} className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-content">
                                    <h6>Feedback delivered to: <b>{ item.deliveredBy.name }</b></h6>
                                    <h6>Feedback for: <b>{ item.feedbackType }</b></h6>
                                    <h6>Feedback Sentiment: <b>{ item.sentiment }</b></h6>
                                    <h6>Feedback:</h6>
                                    <p>{ item.feedback }</p>
                                    <h6>Delivered in Person: <b>{ item.deliveredInPerson }</b></h6>
                                    <h6>Related Link:</h6>
                                    <NavLink to={item.relatedLink}>{ item.relatedLink }</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                });
        }
        else {
            feedbackShow = <div>feedback is type: {feedback.length}</div>
            }


        return (
            <div>
                <Navbar />
                <div style={{height: "50vh" }} className="container">
                    <div className="row">
                        <div className="center-align">
                            <h2>View Feedback By:</h2>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="col text-left userSelect">
                                    <label htmlFor="feedbackBy">View Feedback by:
                                        { userSelect }
                                    </label>
                                </div>
                                <div className="col text-left">
                                    <label htmlFor="feedbackType">Feedback from date:
                                    <input
                                        id="dateFrom"
                                        type="date"
                                        className="datepicker"
                                        onChange={this.onChange}
                                    />
                                    </label>
                                </div>
                                <div style={{ paddingLeft: "11.250px" }}>
                                    <button
                                    type="submit"
                                    className="btn btn waves-effect waves-light hoverable blue accent-3"
                                    >
                                    Search for Feedback
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                <div className="row">
                    <div className="center-align text-left">
                        { feedbackShow }
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

ByTRA.propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    getFeedbackBy: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    feedback: PropTypes.object,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    users: state.users.users,
    auth: state.auth,
    feedback: state.feedback,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getUsers, getFeedbackBy }
)(ByTRA);