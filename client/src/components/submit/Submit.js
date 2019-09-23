import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions/userActions";

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
    }

    componentWillMount() {
        this.props.getUsers();
        this.setState({users: this.props.getUsers()});
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    render() {
        const { user } = this.props.auth;
        const userSelectOptions = this.props.users.map(user => (
            <option key={ user._id } value={ user }>{ user.name }</option>
        ));

        return (
            <div>
                <Navbar />
                <div style={{height: "75vh" }} className="container valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h2>Welcome { user.name }</h2>
                            <form>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label>Feedback for:
                                            <br/>
                                            <select className="form-control">
                                                { userSelectOptions }
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <label>Feedback:</label>
                                    <br/>
                                    <textarea id="feedback" className="materialize-textarea" name="feedback"></textarea>
                                </div>
                                <br/>
                                <button type="submit">Submit Feedback</button>
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
    { getUsers }
)(Submit);