import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login/Login';
import Home from './home/Home';
import Profile from './profile/Profile';

/* Controller component for managing Application Navigations of Login page, Home Page and Profile Page) */
class Controller extends Component {

    constructor() {
        super();
        this.appURL = "https://api.instagram.com/v1/users/self";
    }

    render() {
        return (
            <Router>
                <div className="main-container">
                    <Route exact path='/' render={(props) =>
                        <Login {...props} appURL={this.appURL} />} />
                    <Route exact path='/home' render={(props) =>
                        <Home {...props} appURL={this.appURL} />} />
                    <Route exact path='/profile' render={(props) =>
                        <Profile {...props} appURL={this.appURL} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;