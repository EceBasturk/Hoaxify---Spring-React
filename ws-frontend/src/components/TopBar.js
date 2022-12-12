import React, { Component } from 'react';
import logo from '../assets/logo3.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';

class TopBar extends Component {

    render() {
        const { username, isLoggedIn, onLogoutSuccess } = this.props;

        let links = (
            <ul className="navbar-nav ms-auto">
                <li>
                    <Link className="nav-link" to="/login" >
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
                    <li className="nav-link" onClick={onLogoutSuccess} style={{ cursor: 'pointer' }}>
                        {('Logout')}
                    </li>
                </ul>
            );
        }

        return (
            <div className="shadow-sm bg-light mb-2">
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="200" alt="Logo" />

                    </Link>
                    {links}
                </nav>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        isLoggedIn: store.isLoggedIn,
        username: store.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogoutSuccess: () => dispatch(logoutSuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);