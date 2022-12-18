import React from 'react';
import { useSelector } from 'react-redux';
import UserList from '../components/UserList';
import HoaxSubmit from '../components/HoaxSubmit';

const HomePage = () => {
    const { isLoggedIn } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn
    }));

    return <div className="container">
        <div className="row mt-5">
            <div className="col-6">{isLoggedIn && <HoaxSubmit />}</div>
            <div className="col "></div>
            <div className="col-4 ">
                <UserList />
            </div>
        </div>
    </div>;
};

export default HomePage;