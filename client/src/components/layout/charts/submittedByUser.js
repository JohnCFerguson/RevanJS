import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSubmittedByUserCount } from "../../../actions/feedbackActions";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

class SubmittedByUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submittedByUser: {},
            submittedByUserData: [],
            errors: {}
        };
    }

    componentWillMount() {
    this.props.getSubmittedByUserCount();
    }

    componentWillReceiveProps(nextProps) {
    console.log("Next Props ", nextProps);
    if (nextProps.errors) {
        this.setState({
        errors: nextProps.errors
        });
    }
    if (nextProps.submittedByUser !== this.props.submittedByUser && nextProps.submittedByUser !== undefined) {
        this.setState({
            submittedByUser: nextProps.submittedByUser.submittedByUser
        }, () => {
        console.log('state ', this.state)
        let data = [];
        const submittedByUserList = Object.entries(this.state.submittedByUser)
        for(const [key, value] of submittedByUserList) {
              console.log(value['_id'], value['total'])
            data.push({name: value['_id'], value: value['total']})
        }
        console.log(data)
        this.setState({
            submittedByUserData: data
        });
        });
    }
    }

    render() {
        const { submittedByUser, submittedByUserData } = this.state;

        return (
            <BarChart
                width={300}
                height={600}
                layout="vertical"
                data={submittedByUserData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar name="Feedback Submitted" dataKey="value" fill="#8884d8" />
            </BarChart>
        );
    }
}

SubmittedByUser.propTypes = {
getSubmittedByUserCount: PropTypes.func.isRequired,
submittedByUser: PropTypes.object
}

const mapStateToProps = state => ({
submittedByUser: state.feedback,
errors: state.errors
});

export default connect(
mapStateToProps,
{ getSubmittedByUserCount }
)(SubmittedByUser);