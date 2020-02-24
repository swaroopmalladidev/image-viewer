import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Header.css';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

/**Header Component */
class Header extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedInUser: sessionStorage.getItem('access-token') != null,
            menuList: false
        }
    }

    /**Search box handler for images search */
    searchBoxHandler = (e) => {
        this.props.searchBoxHandler(e.target.value);
    }

    /**Profile pic handler to display menu */
    profilePicHandler = (e) => {
        this.setState({ menuList: !this.state.menuList, anchorEl: this.state.anchorEl != null ? null : e.currentTarget });
    }

    /**My Account handler to navigate user to the user profile page */
    myAccountHandler = () => {
        this.props.history.push("/profile");
    }

    /**Logout handler to navigate user to login screen */
    logOutHandler = () => {
        sessionStorage.removeItem('access-token');
        this.setState({ isLoggedInUser: false });
    }

    render() {

        return (
            <div className='app-header'>
                {!this.state.isLoggedInUser && <Redirect to='/' />}
                <Link to="/home" className="app-logo">Image Viewer</Link>
                {this.state.isLoggedInUser &&
                    <div className="header-right-area">
                        {this.props.pageId === 'home' &&
                            <div className="searchBox-headerarea">
                                <SearchIcon /><Input className="searchBox" placeholder="Search..." disableUnderline={true} onChange={this.searchBoxHandler} />
                            </div>
                        }

                        <div>
                            <IconButton className="profileIcon" onClick={this.profilePicHandler}>
                                <img src={this.props.profilePicture} alt="Profile Pic" className="profilePic" />
                            </IconButton>
                            <Menu className="profile-options" anchorEl={this.state.anchorEl} keepMounted open={this.state.menuList} onClose={this.profilePicHandler}>
                                <MenuItem className="profileMenu-item" onClick={this.myAccountHandler}><span>My Account</span></MenuItem>
                                <hr style={{ width: 80 }} />
                                <MenuItem className="profileMenu-item" onClick={this.logOutHandler}><span>Logout</span></MenuItem>
                            </Menu>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Header;