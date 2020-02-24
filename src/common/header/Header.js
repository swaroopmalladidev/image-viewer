import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Header.css';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            isUserLoggedIn: sessionStorage.getItem('access-token') != null
        }
    }

    searchBoxChangeHandler = () => {

    }

    profilePictureClickHandler = () => {

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
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Header;