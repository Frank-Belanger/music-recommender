import React, { useContext } from 'react';
import HeroPlaylist from './HeroPlaylist';
import TrackHeader from '../track-components/TrackHeader';
import TracksContainer from '../track-components/TrackContainer';
import MusicPlayerContainer from '../music-player-components/MusicPlayerContainer';
import Context from '../../Context';

export default function HeroSectionContainer() {
    const { playlist } = useContext(Context);

    return (
        <div className={`hero-section-container ${playlist.selectedPlaylist ? 'partial-watermark' : 'full-watermark'}`}>
            {playlist.selectedPlaylist ? 
            [<HeroPlaylist key={0} />,
            <TrackHeader key={1} />,
            <TracksContainer key={2} />,
            <MusicPlayerContainer key={3} />]
            :
            <div className="temporary-message">
                Please choose a category and a playlist<br/>to start browsing tracks. 
            </div>
        }
        </div>
    );
}