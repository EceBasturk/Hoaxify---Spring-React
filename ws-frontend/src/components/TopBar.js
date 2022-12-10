import React, { Component } from 'react';
import logo from '../assets/logo3.png';
import { Link } from 'react-router-dom';


class TopBar extends Component {

    state = {
        isLoggedIn: true,
        username: 'user1'
    };
    render() {
        const { isLoggedIn, username } = this.state;
        let links = (
            <ul className="navbar-nav ms-auto">
                <li>
                    <Link className="nav-link" to="/login">
                        {('Login')}
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/signup">
                        {('Sign Up')}
                    </Link>
                </li>
            </ul>
        );
        if (isLoggedIn) {
            links = (
                <ul className="navbar-nav ms-auto">
                    <li>
                        <Link className="nav-link" to={`/user/${username}`}>
                            {username}
                        </Link>
                    </li>
                    <li className="nav-link">{('Logout')}</li>
                </ul>
            );
        }
        return (
            <div className="shadow-sm bg-light mb-2">
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="200" alt="Hoaxify Logo" />

                    </Link>
                    {links}
                </nav>
            </div>
        );
    }
}

export default TopBar;