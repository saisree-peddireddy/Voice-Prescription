import React, { Component } from 'react';
import App from './App';
import Post from './Components/Post';

class Home extends Component {
    // calls the login method in authentication service
    login = () => {
        this.props.auth.login();
    }
    // calls the logout method in authentication service
    logout = () => {
        this.props.auth.logout();
    }
    render() {
        // calls the isAuthenticated method in authentication service
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                {
                    isAuthenticated() && (
                    <div className="container column">
                        <App />
                        </div>
                    )
                }
                {
                    !isAuthenticated() && (
                        <div className="container column" style="width:800px; margin:0 auto;">
                           
                            {this.login()}
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Home;
