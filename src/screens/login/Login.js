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

class Login extends Component {

    constructor(){
        super();
        this.state = {
            username: "",
            userNameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            invalidCredentials: "dispNone",
            isUserLoggedIn: sessionStorage.getItem('access-token') != null
        }
    }

    userNameChangeHandler = (event) => {
        this.setState({username: event.target.value});
    }

    passwordChangeHandler = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div><Header/>
            <br/>
            <br/>
            <Card className="card">
                <CardContent>
                    <Typography variant="subtitle1">
                    <span className="login-label">LOGIN</span>
                    </Typography>
                    <br/>
                    <br/>
                    <FormControl className="formControl" required fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" onChange={this.userNameChangeHandler}/>
                            <FormHelperText className={this.state.userNameRequired}>
                                <span className="error-color">required</span>
                            </FormHelperText>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl className="formControl" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" onChange={this.passwordChangeHandler}/>
                            <FormHelperText className={this.state.passwordRequired}>
                                <span className="error-color">required</span>
                            </FormHelperText>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormHelperText className={this.state.invalidCredentials}>
                            <span className="error-color">Incorrect username and/or password</span>>
                    </FormHelperText>
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={this.loginClickHandler}>Login</Button>
                </CardContent>
            </Card>
            </div>
        )
    }
}

export default Login;