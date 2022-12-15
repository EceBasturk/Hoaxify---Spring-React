import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const [user, setUser] = useState();
    const [notFound, setNotFound] = useState(false);

    //useParams == props.matchs.params.username
    const { username } = useParams();

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
    }, [username]); //username değiştiğinde useEffect çağrılıp güncellenecek

    if (notFound) {
        return (
            <div className='container'>
                <div className='alert alert-danger text-center'>
                    <div>
                        <i className="material-icons" style={{ fontSize: '48px' }}>
                            error
                        </i>
                    </div>
                    {('User Not Found')}
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <ProfileCard />
        </div>
    );
};

export default UserPage;