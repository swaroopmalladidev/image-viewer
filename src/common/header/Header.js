import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            isUserLoggedIn: sessionStorage.getItem('access-token') != null
        }
    }

    render() {
        const {open} = this.state;
        return (
            <div className='app-header'>
                {!this.state.isUserLoggedIn && <Redirect to='/' />}
                <Link to="/home" className="app-logo">Image Viewer</Link>
            </div>
        )
    }
}

export default Header;