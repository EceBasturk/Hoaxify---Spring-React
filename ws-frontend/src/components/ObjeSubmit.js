import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { postObje } from '../api/apiCalls'
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './input';

const ObjeSubmit = () => {
    const { image, username } = useSelector(store => ({ image: store.image, username: store.username }))
    const [focused, setFocused] = useState(false);
    const [obje, setObje] = useState('');
    const [errors, setErrors] = useState({});
    const [newImage, setNewImage] = useState();

    useEffect(() => {
        if (!focused) {
            setObje('')
            setErrors({});
            setNewImage();
        }
    }, [focused]);

    useEffect(() => {
        setErrors({});
    }, [obje]);

    const pendingApiCall = useApiProgress('post', '/api/1.0/objes');

    const onClickFly = async () => {
        const body = {
            content: obje
        };

        try {
            await postObje(body);
            setFocused(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    };

    const onChangeFile = event => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    let textAreaClass = 'form-control';
    if (errors.content) {
        textAreaClass += ' is-invalid';
    }

    return (
        //flex-row silinecek!!
        <div className='card p-2 flex-row'>
            <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle me-1" />
            <div className='flex-fill'>
                <textarea
                    className={`${textAreaClass} mb-2`}
                    rows={focused ? '3' : '1'}
                    onFocus={() => setFocused(true)}
                    onChange={event => setObje(event.target.value)}
                    value={obje}
                    placeholder={`Hi ${username}! Write someting..`}
                />
                <div className="invalid-feedback">{errors.content}</div>
                {focused && (
                    <>
                        <Input type="file" onChange={onChangeFile} />
                        {newImage && <img className="img-thumbnail" src={newImage} />}
                        <div className="text-right mt-1">
                            <ButtonWithProgress
                                className="btn btn-primary"
                                onClick={onClickFly}
                                text="Fly It"
                                pendingApiCall={pendingApiCall}
                                disabled={pendingApiCall} />

                            <button className="btn btn-light d-inline-flex ml-1" onClick={() => setFocused(false)} disabled={pendingApiCall}>
                                <i className="material-icons">close</i>
                                {('Cancel')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ObjeSubmit;
