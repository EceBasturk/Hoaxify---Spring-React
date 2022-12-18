import React from 'react';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const HoaxSubmit = () => {
    const { image } = useSelector(store => ({ image: store.image }))

    return (
        <div className='card p-2 flex-row'>
            <ProfileImageWithDefault imageimage={image} width="32" height="32" className="rounded-circle me-1" />
            <div className='flex-fill'>
                <textarea className='form-control' />
                <div className="text-right mt-2">
                    <button className="btn btn-primary btn-sm float-end">Fly It</button>
                </div>
            </div>
        </div>
    )
}

export default HoaxSubmit;