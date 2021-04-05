import React, { useContext, useState, useEffect } from 'react';
import Context from '../../Context';

export default function SpotifyPlayerContainer() {

    const { token } = useContext(Context);
    const [ spotifyPlayer, setSpotifyPlayer ] = useState({});

    useEffect(() => {
        [{
            name: "https://sdk.scdn.co/spotify-player.js",
            callback: spotifySDKCallback()
        }]
    }, []);

    new ScriptCache();

    spotifySDKCallback = () => {
        window.onSpotifyWebPlaybackSDKReady = () => {
           const spotToken = token;
           const player = new Spotify.Player({
                name: 'Spotify Demo Player',
                getOAuthToken: cb => { cb(spotToken); }
          });

        spotifyPlayer.addListener('player_state_changed'
           // add event listeners to the player
        );

        setSpotifyPlayer({spotifyPlayer});
        }
    }
}
