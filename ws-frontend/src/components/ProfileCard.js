import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import Input from './input';

const ProfileCard = props => {
    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const routeParams = useParams();
    const [inEditMode, setInEditMode] = useState(false);

    const { user } = props;
    const { username, displayName, image } = user;

    const [updatedDisplayName, setUpdatedDisplayName] = useState();



    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined);
        } else {
            setUpdatedDisplayName(displayName);
        }
    }, [inEditMode, displayName]);

    const onClickSave = () => {
        console.log(updatedDisplayName);
    };

    const pathUsername = routeParams.username;
    let message = 'We cannot edit';
    if (pathUsername === loggedInUsername) {
        message = 'We can edit';
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfileImageWithDefault className="rounded-circle shadow" width="200" height="200" alt={`${username} profile`} image={image} />
            </div>
            <div className="card-body">
                {!inEditMode && (
                    <>
                        <h3>
                            {displayName} @{username}
                        </h3>
                        <button className='btn btn-success d-inline-flex' onClick={() => setInEditMode(true)}>
                            <i className="material-icons">edit</i>
                            {('Edit')}
                        </button>
                    </>
                )}
                {inEditMode && (
                    <div>
                        <Input
                            label={('Change Display Name')}
                            defaultValue={displayName}
                            onChange={event => {
                                setUpdatedDisplayName(event.target.value);
                            }}
                        />
                        <div>
                            <button className="btn btn-primary d-inline-flex me-3" onClick={onClickSave}>
                                <i className="material-icons ">save</i>
                                {('Save')}
                            </button>
                            <button className="btn btn-dark d-inline-flex" onClick={() => setInEditMode(false)}>
                                <i className="material-icons">close</i>
                                {('Cancel')}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};


export default ProfileCard;