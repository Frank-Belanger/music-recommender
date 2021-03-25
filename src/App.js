import React, { useState, useEffect } from 'react';
import Context from './Context';
import axios from 'axios';
import Credentials from './Credentials';
import HeroSectionContainer from './components/hero-components/HeroSectionContainer';
import ChooserContainer from './components/chooser-components/ChooserContainer';
import SuggestionBox from './components/suggestion-components/SuggestionBox';

import ParticlesBg from 'particles-bg'
import './styles/main.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './helpers/fontawesome';

function App() {
  const spotify = Credentials();

  const [ token, setToken ] = useState('');  
  const [ navIndex, setNavIndex ] = useState(0);
  const [ category, setCategory ] = useState({selectedCategory: '', listOfCategoriesFromAPI: []});
  const [ playlist, setPlaylist ] = useState({selectedPlaylist: '', listofPlaylistsFromAPI: []});
  const [ track, setTrack ] = useState({selectedTrack: '', listOfTracksFromAPI: []});

  // Get token effect
  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.clientId + ':' + spotify.clientSecret)      
      },
      data: 'grant_type=client_credentials'      
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);
    });
  }, [ spotify.clientId, spotify.clientSecret ]);

  // Get categories effect
  useEffect(() => {
    token && axios('https://api.spotify.com/v1/browse/categories', {
        method: 'GET',
        headers: {  'Authorization' : 'Bearer ' + token },
        params: {
          country: "CA",
          limit: 18
        }
      })
      .then (categoryResponse => {       
        setCategory({
          selectedCategory: '',
          listOfCategoriesFromAPI: categoryResponse.data.categories.items
        });
      });
  }, [ token, setCategory ]);

  // Get playlists with a given category
  useEffect(() => {
    category.selectedCategory && 
    axios(`https://api.spotify.com/v1/browse/categories/${category.selectedCategory}/playlists`, {
        method: 'GET',
        headers: {  'Authorization' : 'Bearer ' + token },
        params: {
          country: "CA",
          limit: 18
        }
      })
      .then (playlistResponse => {       
        setPlaylist({
          selectedPlaylist: '',
          listOfPlaylistsFromAPI: playlistResponse.data.playlists.items
        });

        //console.log(playlist.listOfPlaylistsFromAPI);
      });
  }, [ token, category, setPlaylist ]);

  // Get tracks from a chosen playlist
  useEffect(() => {
    playlist.selectedPlaylist && 
    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist.id}/tracks`, {
        method: 'GET',
        headers: {  'Authorization' : 'Bearer ' + token },
        params: {
          country: "CA"
        }
      })
      .then (trackResponse => {       
        /*setTrack({
          selectedTrack: '',
          listOfTracksFromAPI: trackResponse.data.items
        });*/

        //console.log(trackResponse);
      });
  }, [ token, playlist.selectedPlaylist, setTrack ]);

  return (
    <div className="main-section">
      <Context.Provider value={{
          FontAwesomeIcon,
          navIndex,
          setNavIndex,
          category, 
          setCategory, 
          playlist, 
          setPlaylist ,
          track,
          setTrack
        }}>
        <ParticlesBg type="cobweb" bg={true} />
        <ChooserContainer />
        <HeroSectionContainer />
        <SuggestionBox />
      </Context.Provider>
    </div>
  );
}

export default App;