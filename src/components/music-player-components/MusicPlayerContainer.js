import React, { useContext } from 'react';
import Context from '../../Context';
import MusicPlayerPic from './MusicPlayerPic';
import TrackInfo from '../track-components/TrackInfo';
import MusicPlayerControls from './MusicPlayerControls';

export default function MusicPlayerContainer() {
    const { track } = useContext(Context);
    return (
        <div className="music-player-container">
            {track.selectedTrack ? 
            [<MusicPlayerPic key={0} />,
            <TrackInfo key={1} />,
            <MusicPlayerControls key={2} />]
            :
            ''
        }
        </div>
    )
}