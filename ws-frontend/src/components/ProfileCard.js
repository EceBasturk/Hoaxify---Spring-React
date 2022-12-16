import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import Input from './input';
import { updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';

const ProfileCard = props => {
    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const [inEditMode, setInEditMode] = useState(false);
    const [editable, setEditable] = useState(false);

    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    const { username, displayName, image } = user;
    const [updatedDisplayName, setUpdatedDisplayName] = useState();

    useEffect(() => {
        setEditable(pathUsername === loggedInUsername);
    }, [pathUsername, loggedInUsername]);

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined);
        } else {
            setUpdatedDisplayName(displayName);
        }
    }, [inEditMode, displayName]);

    const onClickSave = async () => {
        const body = {
            displayName: updatedDisplayName
        };
        try {
            const response = await updateUser(username, body);
            setInEditMode(false);
            setUser(response.data);
        } catch (error) { }

    };

    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);

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
                        {editable && (
                            <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                                <i className="material-icons">edit</i>
                                {('Edit')}
                            </button>
                        )}
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
                            <ButtonWithProgress
                                className="btn btn-primary d-inline-flex"
                                onClick={onClickSave}
                                disabled={pendingApiCall}
                                pendingApiCall={pendingApiCall}
                                text={
                                    <>
                                        <i className="material-icons">save</i>
                                        {('Save')}
                                    </>
                                }
                            />
                            <button className="btn btn-light d-inline-flex ml-1" onClick={() => setInEditMode(false)} disabled={pendingApiCall}>
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