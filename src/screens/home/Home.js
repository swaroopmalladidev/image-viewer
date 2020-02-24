import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            isUserLoggedIn: sessionStorage.getItem('access-token') != null,
            accessToken: sessionStorage.getItem('access-token'),
            profilePicture: '',
            username: ''
        }
    }

    componentWillMount() {
        
        if (this.state.isUserLoggedIn) {
            let thisComponent = this;
            let xhrProfile = new XMLHttpRequest();
            
            xhrProfile.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    let responseData = JSON.parse(this.response).data;
                    
                    thisComponent.setState({
                        profilePicture: responseData.profile_picture,
                        username: responseData.username
                    })
                }
            });
            
            xhrProfile.open('GET', this.props.baseUrl + "?access_token=" + this.state.accessToken);
            xhrProfile.send();
        }
    }

    render() {
        return (
            <div><Header pageId="home" {...this.props} profilePicture={this.state.profilePicture} /></div>
        )
    }
}

export default Home;