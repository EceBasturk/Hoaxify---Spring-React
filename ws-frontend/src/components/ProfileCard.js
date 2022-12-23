import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import Input from './input';
import { updateUser, deleteUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import { updateSuccess, logoutSuccess } from '../redux/authActions';
import Modal from './Modal';

const ProfileCard = props => {
    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const [inEditMode, setInEditMode] = useState(false);
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const history = useHistory();

    const dispatch = useDispatch();

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
            setNewImage(undefined);
        } else {
            setUpdatedDisplayName(displayName);
        }
    }, [inEditMode, displayName]);

    const onClickSave = async () => {
        const body = {
            displayName: updatedDisplayName,
            image: newImage?.split(',')[1]
        };
        try {
            const response = await updateUser(username, body);
            setInEditMode(false);
            setUser(response.data);
            dispatch(updateSuccess(response.data));
        } catch (error) {
            setValidationErrors(error.response.data.validationErrors);
        }

    };

    const onChangeFile = event => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }

    const onClickCancel = () => {
        setModalVisible(false);
    };

    const onClickDeleteUser = async () => {
        await deleteUser(username);
        setModalVisible(false);
        dispatch(logoutSuccess());
        history.push('/');
    };

    //setValidationErrors hookunda previousValidationErrors parametresi ile bir fonks yazıldı ve tek satırlık bir fonksiyon olup direkt olarak render edilebileceği için ({}) gibi () içine alınarak yazıldı. return  buna dönüştü ()
    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors,
            displayName: undefined
        }))
    }, [updatedDisplayName])

    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors,
            image: undefined
        }));
    }, [newImage]);

    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);
    const pendingApiCallDeleteUser = useApiProgress('delete', `/api/1.0/users/${username}`, true);

    const { displayName: displayNameError, image: imageError } = validationErrors;

    let message = 'We cannot edit';
    if (pathUsername === loggedInUsername) {
        message = 'We can edit';
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfileImageWithDefault
                    className="rounded-circle shadow"
                    width="200"
                    height="200"
                    alt={`${username} profile`}
                    image={image}
                    tempimage={newImage}
                />
            </div>
            <div className="card-body">
                {!inEditMode && (
                    <>
                        <h3>
                            {displayName} @{username}
                        </h3>
                        {editable && (
                            <>
                                <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                                    <i className="material-icons me">edit</i>
                                    {('Edit')}
                                </button>
                                <div className="mt-2">
                                    <button className="btn btn-danger d-inline-flex" onClick={() => setModalVisible(true)}>
                                        <i className="material-icons me-1">person_remove</i>
                                        {('Delete My Account')}
                                    </button>
                                </div>
                            </>
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
                            error={displayNameError}
                        />
                        <Input type="file" onChange={onChangeFile} error={imageError} />
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
            <Modal
                visible={modalVisible}
                title={('Delete My Account')}
                okButton={('Delete My Account')}
                onClickCancel={onClickCancel}
                onClickOk={onClickDeleteUser}
                message={('Are you sure to delete your account?')}
                pendingApiCall={pendingApiCallDeleteUser}
            />
        </div>
    );
};


export default ProfileCard;