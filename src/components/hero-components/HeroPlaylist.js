import React, { useContext } from 'react';
import Context from '../../Context';

import PlaylistHeroInfo from '../playlists-components/PlaylistHeroInfo';
import PlaylistPic from '../playlists-components/PlaylistPic';

export default function HeroPlaylist() {
    const { playlist } = useContext(Context);

    return (
        <div className="hero-playlist-container">
            {
                playlist?.selectedPlaylist &&
                <PlaylistPic addStyle={"hero-playlist-icon"} icon={playlist.selectedPlaylist.images[0].url}/>
            }
            {
                playlist?.selectedPlaylist &&
                <PlaylistHeroInfo />
            }
        </div>
    );
}