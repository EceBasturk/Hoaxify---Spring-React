import React from 'react';
import { useSelector } from 'react-redux';
import UserList from '../components/UserList';
import ObjeSubmit from '../components/ObjeSubmit';
import ObjeFeed from '../components/ObjeFeed'
const HomePage = () => {
    const { isLoggedIn } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn
    }));

    return <div className="container">
        <div className="row mt-5">
            <div className="col-6">{isLoggedIn && (
                <div className="mb-1"> <ObjeSubmit /> </div>
            )}
                <ObjeFeed />
            </div>
            <div className="col-2 "></div>
            <div className="col-4 ">
                <UserList />
            </div>
        </div>
    </div>;
};

export default HomePage;