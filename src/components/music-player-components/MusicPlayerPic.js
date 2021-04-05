import React, { useContext} from 'react';
import Context from '../../Context';

export default function MusicPlayerContainer() {
    const { track } = useContext(Context);

    const picStyle = {
        backgroundImage: `url(${track.selectedTrack.album.images[0].url})`,
        backgroundSize: 'cover',
        borderRadius: '20px'
    }

    return (
        <div style={picStyle} className='music-player-pic' />
    );
}