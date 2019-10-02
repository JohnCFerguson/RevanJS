import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSubmittedForUserCount } from "../../../actions/feedbackActions";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

class SubmittedForUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submittedForUser: {},
            submittedForUserData: [],
            errors: {}
        };
    }

    componentWillMount() {
    this.props.getSubmittedForUserCount();
    }

    componentWillReceiveProps(nextProps) {
    console.log("Next Props ", nextProps);
    if (nextProps.errors) {
        this.setState({
        errors: nextProps.errors
        });
    }
    if (nextProps.submittedForUser !== this.props.submittedForUser && nextProps.submittedForUser !== undefined) {
        this.setState({
            submittedForUser: nextProps.submittedForUser.submittedForUser
        }, () => {
        console.log('state ', this.state)
        let data = [];
        const submittedForUserList = Object.entries(this.state.submittedForUser)
        for(const [key, value] of submittedForUserList) {
              console.log(value['_id'], value['total'])
            data.push({name: value['_id'], value: value['total']})
        }
        console.log(data)
        this.setState({
            submittedForUserData: data
        });
        });
    }
    }

    render() {
        const { submittedForUserData } = this.state;

        return (
            <BarChart
                width={300}
                height={600}
                layout="vertical"
                data={submittedForUserData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar name="Feedback Submitted for User" dataKey="value" fill="#8884d8" />
            </BarChart>
        );
    }
}

SubmittedForUser.propTypes = {
getSubmittedForUserCount: PropTypes.func.isRequired,
submittedForUser: PropTypes.object
}

const mapStateToProps = state => ({
submittedForUser: state.feedback,
errors: state.errors
});

export default connect(
mapStateToProps,
{ getSubmittedForUserCount }
)(SubmittedForUser);