import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { postObje } from '../api/apiCalls'

const ObjeSubmit = () => {
    const { image, username } = useSelector(store => ({ image: store.image, username: store.username }))
    const [focused, setFocused] = useState(false);
    const [obje, setObje] = useState('');

    useEffect(() => {
        if (!focused) {
            setObje('')
        }
    }, [focused]);

    const onClickFly = async () => {
        const body = {
            content: obje
        };

        try {
            await postObje(body);
        } catch (error) { }
    };
    return (
        <div className='card p-2 flex-row'>
            <ProfileImageWithDefault imageimage={image} width="32" height="32" className="rounded-circle me-1" />
            <div className='flex-fill'>
                <textarea
                    className="form-control"
                    rows={focused ? '3' : '1'}
                    onFocus={() => setFocused(true)}
                    onChange={event => setObje(event.target.value)}
                    value={obje}
                    placeholder={`Hi ${username}!\nWrite someting..`}
                />
                {focused && (
                    <div className="text-right mt-1">
                        <button className="btn btn-primary" onClick={onClickFly}>
                            Fly It
                        </button>
                        <button className="btn btn-light d-inline-flex ml-1" onClick={() => setFocused(false)}>
                            <i className="material-icons">close</i>
                            {('Cancel')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ObjeSubmit;
