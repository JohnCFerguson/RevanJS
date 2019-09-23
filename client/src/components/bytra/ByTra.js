import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Navbar from "../layout/Navbar";

class ByTra extends Component {
    render() {
        const { user } = this.props.auth;

        return (
            <div>
                <Navbar />
                <div style={{height: "75vh" }} className="container valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <p>Welcome { user.name.split(" ")[0] } to the ByTra Component!</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ByTra.propTypes = {
    auth: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(ByTra);