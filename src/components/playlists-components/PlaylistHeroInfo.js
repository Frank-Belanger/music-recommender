import React, { useContext } from 'react';
import Context from '../../Context';

export default function PlaylistHeroInfo(props) {
    const { playlist } = useContext(Context);

    return (
        //<div style={picStyle} className={(`${props?.addStyle ? props.addStyle : 'playlist-pic'}`)}/>
        <div className="hero-playlist-info">
            <div className="hero-playlist-title">{ playlist.selectedPlaylist ? playlist.selectedPlaylist.name : '' }</div>
            <div className="hero-playlist-desc">{ playlist.selectedPlaylist ? playlist.selectedPlaylist.description : '' }</div>
        </div>
    );
}