import React, { useContext } from 'react';
import Context from '../../Context';

export default function PlaylistHeroInfo(props) {
    const { playlist } = useContext(Context);

    return (
        //<div style={picStyle} className={(`${props?.addStyle ? props.addStyle : 'playlist-pic'}`)}/>
        <div className="playlist-hero-info">
            <div className="playlist-hero-title">{ playlist.selectedPlaylist ? playlist.selectedPlaylist.name : '' }</div>
            <div className="playlist-hero-desc">{ playlist.selectedPlaylist ? playlist.selectedPlaylist.description : '' }</div>
        </div>
    );
}