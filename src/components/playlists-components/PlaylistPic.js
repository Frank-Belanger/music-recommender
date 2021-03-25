import React from 'react';

export default function PlaylistPic(props) {
    const picStyle = {
        backgroundImage: `url(${props.icon})`,
        backgroundSize: 'contain',
        backgroundColor: 'lightgrey',
        borderRadius: '10px',
        backgroundBlendMode: 'multiply'
    }

    return (
        <div style={picStyle} className={(`${props?.addStyle ? props.addStyle : 'playlist-pic'}`)} />
    );
}