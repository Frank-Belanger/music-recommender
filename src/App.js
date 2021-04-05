import React, { useState, useEffect } from "react";
import Context from "./Context";
import axios from "axios";
import Credentials from "./Credentials";
import HeroSectionContainer from "./components/hero-components/HeroSectionContainer";
import ChooserContainer from "./components/chooser-components/ChooserContainer";
import SuggestionBox from "./components/suggestion-components/SuggestionBox";

import ParticlesBg from "particles-bg";
import "./styles/main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./helpers/fontawesome";

function App() {
  const spotify = Credentials();
  var [audio, setAudio] = useState({});

  const [token, setToken] = useState("");
  const [navIndex, setNavIndex] = useState(0);
  const [category, setCategory] = useState({
    selectedCategory: "",
    listOfCategoriesFromAPI: [],
  });
  const [playlist, setPlaylist] = useState({
    selectedPlaylist: "",
    listofPlaylistsFromAPI: [],
  });
  const [track, setTrack] = useState({
    selectedTrack: "",
    hasPreview: false,
    listOfTracksFromAPI: [],
  });
  const [likedTrack, setLikedTrack] = useState([]);
  const [suggestions, setSuggestions] = useState({
    listOfTracksFromAPI: [],
  });
  const [player, setPlayer] = useState({
    isPlaying: false,
    state: "stopped"
  });

  // Set the spotify player script in the DOM
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      // You can now initialize Spotify.Player and use the SDK
    };
  }, []);

  // Get a token
  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotify.clientId + ":" + spotify.clientSecret),
      },
      data: "grant_type=client_credentials",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);
    });
  }, [spotify.clientId, spotify.clientSecret]);

  // Get categories effect
  useEffect(() => {
    token &&
      axios("https://api.spotify.com/v1/browse/categories", {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
        params: {
          country: "CA",
          limit: 30,
        },
      }).then((categoryResponse) => {
        setCategory({
          selectedCategory: "",
          listOfCategoriesFromAPI: categoryResponse.data.categories.items,
        });
      });
  }, [token, setCategory]);

  // Get playlists with a given category
  useEffect(() => {
    category.selectedCategory &&
      axios(
        `https://api.spotify.com/v1/browse/categories/${category.selectedCategory}/playlists`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
          params: {
            country: "CA",
            limit: 30,
          },
        }
      ).then((playlistResponse) => {
        setPlaylist({
          selectedPlaylist: "",
          listOfPlaylistsFromAPI: playlistResponse.data.playlists.items,
        });
      });
  }, [token, category, setPlaylist]);

  // Get tracks from a chosen playlist
  useEffect(() => {
    playlist.selectedPlaylist &&
      axios(
        `https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist.id}/tracks`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
          params: {
            country: "CA",
          },
        }
      ).then((trackResponse) => {
        setTrack({
          selectedTrack: "",
          listOfTracksFromAPI: trackResponse.data.items,
        });
      });
  }, [token, playlist.selectedPlaylist, setTrack]);
  
  // Get recommendations
  useEffect(() => {
    likedTrack.length > 0 &&
      axios(`https://api.spotify.com/v1/recommendations`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
        params: {
          market: "CA",
          seed_tracks: likedTrack.join(","),
          seed_artists: "",
          seed_genres: "",
        },
      }).then((response) => {
        setSuggestions({
          listOfTracksFromAPI: response.data.tracks,
        });
      });
  }, [token, likedTrack]);

  return (
    <div className="main-section">
      <Context.Provider
        value={{
          FontAwesomeIcon,
          navIndex,
          setNavIndex,
          category,
          setCategory,
          playlist,
          setPlaylist,
          track,
          setTrack,
          likedTrack,
          setLikedTrack,
          suggestions,
          setSuggestions,
          player,
          setPlayer,
          audio,
          setAudio
        }}
      >
        <ParticlesBg type="cobweb" bg={true} />
        <ChooserContainer />
        <HeroSectionContainer />
        <SuggestionBox />
      </Context.Provider>
    </div>
  );
}

export default App;
