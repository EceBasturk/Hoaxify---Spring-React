import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';

const UserListItem = props => {
    const { user } = props;
    const { username, displayName, image } = user;

    return (
        <Link to={`/user/${username}`} className="list-group-item list-group-item-action list-group-item-light mb-2 ">
            <ProfileImageWithDefault className="rounded-circle" width="32" height="32" alt={`${username} profile`} image={image} />
            <span className='p-2'>
                {username}
            </span>
        </Link>
    );
};

export default UserListItem;