import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFeedbackCount } from "../../../actions/feedbackActions";


class SubmittedFor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: {},
            errors: {}
        };
    }

    componentWillMount() {
      this.props.getFeedbackCount();
    }

    componentWillReceiveProps(nextProps) {
      console.log("Next Props ", nextProps);
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
      if (nextProps.feedback !== this.props.feedback && nextProps.feedback !== undefined) {
        this.setState({
          feedback: nextProps.feedback.feedback[0]
        }, () => {console.log('state: ', this.state)});
      }
    }

    render() {
        const { width, height, arc, color, feedback } = this.state;
        const key = Object.keys(feedback);
        const value = Object.values(feedback);

        return (
          <div>{key}: {value}</div>
        );
    }
}

SubmittedFor.propTypes = {
  getFeedbackCount: PropTypes.func.isRequired,
  feedback: PropTypes.object
}

const mapStateToProps = state => ({
  feedback: state.feedback,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getFeedbackCount }
)(SubmittedFor);