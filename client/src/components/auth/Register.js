import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { getManagers } from "../../actions/userActions"
import classnames from "classnames";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            managers: [],
            manager: "",
            isManager: false,
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentWillMount() {
        this.setState({managers: this.props.getManagers()})
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
              this.props.history.push("/dashboard");
        }
    };

    getDerivedStateFromProps (nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    onChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.id;
        console.log(id + " === " + value)
        this.setState({ [id]: value });
    };

    onSubmit = e => {
        e.preventDefault();

        let managerObj;

        this.props.managers.forEach(user => {
            console.log(this.state.manager)
            if(user._id === this.state.manager){
                console.log(user._id + " === " + this.state.managers)
                managerObj = user._id
            }
            else {
                managerObj = 'N/A'
            }
            console.log(managerObj)
        });

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            manager: managerObj,
            isManager: this.state.isManager,
            password: this.state.password,
            password2: this.state.password2
        };

        console.log(newUser);

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        const managerSelect = <select
                                onChange={this.onChange}
                                value={this.state.manager}
                                id="manager"
                                className="form-control input-field"
                            >
                                <option key="blank" id="blank" value=""></option>
                                {
                                    this.props.managers.map(user => {
                                        return <option key={ user._id } value={ user._id }>{ user.name }</option> })
                                }
                            </select>;

        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to Home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4><b>Register</b> below</h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log In</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    name="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                      })}
                                />
                                <label htmlFor="name">Name</label>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email
                                      })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="col s12">
                                <label htmlFor="manager">Manager
                                    { managerSelect }
                                </label>
                            </div>
                            <div>
                                <label htmlFor="isManager" className="form-check-label">Is this a Manager?</label>
                                <input
                                    id="isManager"
                                    type="checkbox"
                                    className=""
                                    value={this.state.isManager}
                                    checked={this.state.isManager}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    name="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password
                                      })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    name="password2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password2
                                      })}
                                />
                                <label htmlFor="password2">Confirm Password</label>
                                <span className="red-text">{ errors.password2 }</span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    getManagers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    managers: state.managers.managers,
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser, getManagers }
)(withRouter(Register));