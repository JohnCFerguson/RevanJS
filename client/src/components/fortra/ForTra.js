import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions/userActions";
import { getFeedback } from "../../actions/feedbackActions";


import Navbar from "../layout/Navbar";

class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackFor: "",
            dateFrom: Date.now
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

        const feedback = {
            feedbackFor: feedbackForObj,
            from: this.state.dateFrom
        }

        console.log(feedback);

        this.props.getFeedback(feedback)
    };

    render() {
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

        return (
            <div>
                <Navbar />
                <div style={{height: "50vh" }} className="container">
                    <div className="row">
                        <div className="center-align">
                            <h2>Submit Feedback</h2>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="col text-left userSelect">
                                    <label htmlFor="feedbackFor">View Feedback for:
                                        { userSelect }
                                    </label>
                                </div>
                                <div className="col text-left">
                                    <label htmlFor="feedbackType">Feedback from date:
                                    <input
                                        id="dateFrom"
                                        type="date"
                                        class="datepicker"
                                        value={this.state.dateFrom}
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
                </div>
            </div>
        );
    }
}

Submit.propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    getFeedback: PropTypes.func.isRequired,
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
    { getUsers, getFeedback }
)(Submit);