import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Header.css';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            isUserLoggedIn: sessionStorage.getItem('access-token') != null,
            menuList: false
        }
    }

    searchBoxChangeHandler = () => {

    }

    profilePictureClickHandler = (e) => {
        this.setState({menuList: !this.state.menuList, anchorEl: this.state.anchorEl != null ? null : e.currentTarget});
    }

    myAccountClickHandler = () => {
        this.props.history.push("/profile");
    }

    logOutClickHandler = () => {
        sessionStorage.removeItem('access-token');
        this.setState({isUserLoggedIn: false});
    }
    
    render() {
        const {open} = this.state;
        return (
            <div className='app-header'>
                {!this.state.isUserLoggedIn && <Redirect to='/' />}
                <Link to="/home" className="app-logo">Image Viewer</Link>
                {this.state.isUserLoggedIn &&
                    <div className="header-right-area">
                        
                        {this.props.pageId === 'home' &&
                            <div className="searchBox-headerarea">
                                <SearchIcon className="searchIcon" />
                                <Input placeholder="Search..." disableUnderline={true} className="searchBox" onChange={this.searchBoxChangeHandler} />
                            </div>
                        }
                        
                        <div>
                            <IconButton className="profile-pictureIcon" onClick={this.profilePictureClickHandler}>
                            <img src={this.props.profilePicture} alt="Profile Pic" className="profile-pic" />
                            </IconButton>
                            <Menu className="profile-options" anchorEl={this.state.anchorEl} keepMounted open={this.state.menuList} onClose={this.profilePictureClickHandler}>
                                <MenuItem className="profileMenu-item" onClick={this.myAccountClickHandler}><span>My Account</span>
                                </MenuItem>
                                <hr style={{width: 80}}/>
                                <MenuItem className="profileMenu-item" onClick={this.logOutClickHandler}><span>Logout</span>
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Header;