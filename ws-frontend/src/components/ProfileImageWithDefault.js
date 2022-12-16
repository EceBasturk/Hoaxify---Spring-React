import React from 'react';
import defaultPicture from '../assets/p3.jpg';

const ProfileImageWithDefault = props => {
    const { image } = props;

    let imageSource = defaultPicture;
    if (image) {
        imageSource = image;
    }
    return <img alt={`Profile`} src={imageSource} {...props} />;
};

export default ProfileImageWithDefault;