import React, { Component } from 'react';
import './Login.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

/** Login Component */
class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            userNameRequired: "dispNone",
            passwordRequired: "dispNone",
            invalidCredentials: "dispNone",
            isLoggedInUser: sessionStorage.getItem('access-token') != null
        }
    }

    /* Username change Handler */
    userNameHandler = (event) => {
        this.setState({ username: event.target.value });
    }

    /* Password change Handler */
    passwordHandler = (event) => {
        this.setState({ password: event.target.value });
    }

    /* Login button handler with validations*/
    loginButtonHandler = () => {
        /* Pass username, password and upgrad provided access token as hard coded values for user validation*/
        let loginUserName = "upgrad";
        let loginPassword = "upgradpwd";
        let accessToken = "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784";
        /* Check for empty fields in username and password */
        this.state.username === "" ? this.setState(
            { userNameRequired: "dispBlock" }) : this.setState({ userNameRequired: "dispNone" });
        this.state.password === "" ? this.setState(
            { passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        /* Check for validaity of provided username and password as per the defined values here*/
        if (this.state.username === "" || this.state.password === "") {
            this.setState({ invalidCredentials: "dispNone" });
        } else if (this.state.username === loginUserName && this.state.password === loginPassword) {
            sessionStorage.setItem("access-token", accessToken);
            this.props.history.push("/home");
        } else {
            this.setState({ invalidCredentials: "dispBlock" });
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.isLoggedInUser && <Redirect to='/home' />
                }
                <Header />
                <br />
                <br />
                {/* /*LOGIN Card*/}
                <Card className="card">
                    <CardContent>
                        <Typography variant="subtitle1">
                            <span className="login-label">
                                LOGIN
                    </span>
                        </Typography>
                        <br />
                        <br />
                        <FormControl required fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" onChange={this.userNameHandler} />
                            <FormHelperText className={this.state.userNameRequired}>
                                <span className="error-color">
                                    required
                                </span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" onChange={this.passwordHandler} />
                            <FormHelperText className={this.state.passwordRequired}>
                                <span className="error-color">
                                    required
                                </span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <FormHelperText className={this.state.invalidCredentials}>
                            <span className="error-color">
                                Incorrect username and/or password
                            </span>
                        </FormHelperText>
                        <br />
                        <br />
                        <Button variant="contained" color="primary" onClick={this.loginButtonHandler}>
                            LOGIN
                    </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Login;