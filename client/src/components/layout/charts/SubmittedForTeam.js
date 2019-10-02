import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSubmittedForTeamCount } from "../../../actions/feedbackActions";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

class SubmittedForTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submittedForTeam: {},
            submittedForTeamData: [],
            errors: {}
        };
    }

    componentWillMount() {
    this.props.getSubmittedForTeamCount();
    }

    componentWillReceiveProps(nextProps) {
    console.log("Next Props ", nextProps);
    if (nextProps.errors) {
        this.setState({
        errors: nextProps.errors
        });
    }
    if (nextProps.submittedForTeam !== this.props.submittedForTeam && nextProps.submittedForTeam !== undefined) {
        this.setState({
            submittedForTeam: nextProps.submittedForTeam.submittedForTeam
        }, () => {
        console.log('state ', this.state)
        let data = [];
        const submittedForTeamList = Object.entries(this.state.submittedForTeam)
        for(const [key, value] of submittedForTeamList) {
              console.log(value['name'], value['total'])
              if(value['total'] > 0){
                data.push({name: value['name'], value: value['total']})
              }
        }
        console.log("data: ", data)
        this.setState({
            submittedForTeamData: data
        });
        });
    }
    }

    render() {
        const { submittedForTeamData } = this.state;

        return (
            <BarChart
                width={300}
                height={600}
                layout="vertical"
                data={submittedForTeamData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar name="Feedback Submitted for Team" dataKey="value" fill="#8884d8" />
            </BarChart>
        );
    }
}

SubmittedForTeam.propTypes = {
getSubmittedForTeamCount: PropTypes.func.isRequired,
submittedForTeam: PropTypes.object
}

const mapStateToProps = state => ({
submittedForTeam: state.feedback,
errors: state.errors
});

export default connect(
mapStateToProps,
{ getSubmittedForTeamCount }
)(SubmittedForTeam);