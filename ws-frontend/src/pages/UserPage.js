import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';
import ObjeFeed from '../components/ObjeFeed'

const UserPage = () => {
    //boş bir obje dönerek veritabanı hatalarını engelledik
    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);

    //useParams == props.matchs.params.username
    const { username } = useParams();

    const pendingApiCall = useApiProgress('get', '/api/1.0/users/' + username, true);

    //user her değiştiğinde useEffect çalışacak
    useEffect(() => {
        setNotFound(false);
    }, [user]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
            } catch (error) {
                setNotFound(true);
            }
        };
        loadUser();
    }, [username]);//username değiştiğinde useEffect çağrılıp güncellenecek



    if (notFound) {
        return (
            <div className='container'>
                <div className='alert alert-danger text-center'>
                    <div>
                        <i className="material-icons" style={{ fontSize: '48px' }}>
                            error
                        </i>
                    </div>
                    <h6>
                        {('User Not Found')}
                    </h6>
                </div>
            </div>
        )
    }

    if (pendingApiCall || user.username !== username) {
        return <Spinner />;
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <ProfileCard user={user} />
                </div>
                <div className="col">
                    <ObjeFeed />
                </div>
            </div>
        </div>
    );
};

export default UserPage;