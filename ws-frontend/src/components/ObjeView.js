import React, { useState } from "react";
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';
import { deleteObje } from '../api/apiCalls';
import Modal from './Modal';
import { useApiProgress } from '../shared/ApiProgress';

const ObjeView = props => {
    const loggedInUser = useSelector(store => store.username);
    const { obje, onDeleteObje } = props;
    const { user, content, timestamp, fileAttachment, id } = obje;
    const { username, displayName, image } = user;
    const [modalVisible, setModalVisible] = useState(false);

    const pendingApiCall = useApiProgress('delete', `/api/1.0/objes/${id}`, true);

    const ownedByLoggedInUser = loggedInUser === username;

    const formatted = format(timestamp);

    const onClickDelete = async () => {
        await deleteObje(id);
        onDeleteObje(id);
    };


    const onClickCancel = () => {
        setModalVisible(false);
    };

    return (
        <>
            <div className="card p-1 m-2">
                <div className="d-flex">
                    <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle m-1" />
                    <div className="flex-fill m-auto p-1 ">
                        <Link to={`/user/${username}`} className="text-dark text-decoration-none">
                            <h6 className="d-inline">
                                {displayName}@{username}
                            </h6>
                            <span> - </span>
                            <span>{formatted}</span>
                        </Link>
                    </div>
                    {ownedByLoggedInUser && (
                        <button className="btn btn-delete-link btn-sm" onClick={() => setModalVisible(true)}>
                            <i className="material-icons">delete_outline</i>
                        </button>
                    )}
                </div>
                <div className="ms-5">{content}</div>
                <div className="col-4 ">
                    {fileAttachment && (
                        <div className="ms-5">
                            <img className="img-thumbnail" src={'images/' + fileAttachment.name} alt={content} />
                        </div>
                    )}
                </div>
                <Modal //JSX formatı
                    visible={modalVisible}
                    title={('Delete Content')}
                    onClickCancel={onClickCancel}
                    onClickOk={onClickDelete}
                    message={
                        <div>
                            <div>
                                <strong>{('Are you sure to delete content?')}</strong>
                            </div>
                            <span>{content}</span>
                        </div>
                    }
                    pendingApiCall={pendingApiCall}
                    okButton={('Delete Content')}
                />
            </div>
        </>
    );
}

export default ObjeView;