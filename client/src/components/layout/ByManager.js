import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getManagers } from "../../actions/userActions";
import { getFeedbackByManager } from "../../actions/feedbackActions";


import Navbar from "./Navbar";

class ByManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackFor: "",
            users: {},
            managers: {},
            dateFrom: Date(),
            feedback:[]
        };
    };

    componentWillMount() {
        const date = new Date();
        date.setDate(date.getDate() - 7)

        this.setState({
            managers: this.props.getManagers(),
            dateFrom: date
        });
    };

    componentWillReceiveProps(nextProps) {
        // console.log("props: ",  nextProps)
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

    // need to update this component to user componentDidUpdate instead of componentWillReceiveProps()
    // componentDidUpdate() {
        // console.log('State has changed...');
        // console.log(this.state);
    // }

    onChange = e => {
        if(document.getElementById('blank')){
            document.getElementById('blank').remove()
        }

        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        let feedbackForObj;

        this.props.managers.forEach(user => {
            if(user._id === this.state.feedbackFor){
                feedbackForObj = {
                    id: user._id,
                    name: user.name
                };
            }
            else {
                return null;
            }
        });


        const feedback = {
            feedbackFor: feedbackForObj,
            from: this.state.dateFrom
        }

        this.props.getFeedbackByManager(feedback);
    };

    render() {
        const { feedback, feedbackFor} = this.state;
        const userSelect = <select
                                onChange={this.onChange}
                                value={this.state.feedbackFor}
                                id="feedbackFor"
                                className="form-control input-field"
                            >
                                <option key="blank" id="blank" value=""></option> 
                                {
                                    this.props.managers.map(user => {
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
                                    <h6>Feedback delivered to: <b>{ item.feedbackFor.name }</b></h6>
                                    <h6>Feedback delivered by: <b>{ item.deliveredBy.name }</b></h6>
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

        const submitEnabled = feedbackFor.length > 0;

        return (
            <div>
                <Navbar />
                <div style={{height: "50vh" }} className="container">
                    <div className="row">
                        <div className="center-align">
                            <h2>View Feedback by Team:</h2>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="col text-left userSelect">
                                    <label htmlFor="feedbackFor">View Feedback by Team:
                                        { userSelect }
                                    </label>
                                </div>
                                <div className="col text-left">
                                    <label htmlFor="feedbackType">Feedback from date:
                                    <br />
                                    <sub>Date defaults to 1 week ago</sub>
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
                                        disabled={!submitEnabled}
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

ByManager.propTypes = {
    getManagers: PropTypes.func.isRequired,
    managers: PropTypes.array.isRequired,
    getFeedbackByManager: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    feedback: PropTypes.object,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    managers: state.managers.managers,
    auth: state.auth,
    feedback: state.feedback,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getManagers, getFeedbackByManager }
)(ByManager);