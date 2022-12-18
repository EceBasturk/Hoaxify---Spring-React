import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo3.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const TopBar = props => {
    const { username, isLoggedIn, displayName, image } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        displayName: store.displayName,
        image: store.image
    }));


    //useRef bir component içerisinde component'in tekrar render 
    //olmasını tetiklemeden “mutable” değişken tutmamızı sağlayan yapıdır.
    const menuArea = useRef(null);

    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        document.addEventListener('click', menuClickTracker);
        return () => {
            document.removeEventListener('click', menuClickTracker);
        };
    }, [isLoggedIn]);

    const menuClickTracker = event => {
        if (menuArea.current === null || !menuArea.current.contains(event.target)) {
            setMenuVisible(false);
        }
    };

    const dispatch = useDispatch();

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    };

    let links = (
        <ul className="navbar-nav ms-auto" >
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
        let dropDownClass = 'dropdown-menu p-0 shadow ';
        if (menuVisible) {
            dropDownClass += ' show';
        }
        links = (
            <ul className="navbar-nav  ms-auto " ref={menuArea}>
                <li className="nav-item dropdown">
                    <div className="d-flex" style={{ cursor: 'pointer' }} onClick={() => setMenuVisible(true)}>
                        <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle m-auto" />
                        <span className="nav-link dropdown-toggle">{displayName}</span>
                    </div>
                    <div className={dropDownClass}>
                        <Link className="dropdown-item d-flex p-2" to={`/user/${username}`} onClick={() => setMenuVisible(false)}>
                            <i className="material-icons text-info me-1">person</i>
                            {('My Profile')}
                        </Link>
                        <span className="dropdown-item  d-flex p-2" onClick={onLogoutSuccess} style={{ cursor: 'pointer' }}>
                            <i className="material-icons text-danger me-1">power_settings_new</i>
                            {('Logout')}
                        </span>
                    </div>
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
};

export default TopBar;