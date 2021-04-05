import React, { useContext } from "react";
import msToTime from "../../helpers/msToTime";
import Context from "../../Context";

export default function SuggestionTracks(props) {
  const { 
    FontAwesomeIcon, 
    suggestions, 
    track, 
    setTrack, 
    setAudio, 
    setPlayer, 
    audio 
  } = useContext(Context);

  function handleSetTrack() {
    setTrack({
      selectedTrack: suggestions.listOfTracksFromAPI[props.num],
      hasPreview: suggestions.listOfTracksFromAPI[props.num].preview_url
        ? true
        : false,
      listOfTracksFromAPI: track.listOfTracksFromAPI,
    });
  }

  function playPreview() {
    setAudio(new Audio(suggestions.listOfTracksFromAPI[props.num].preview_url));
    audio.play();    
    setPlayer({ isPlaying: true, state: "playing" });
  };

  return (
    <div className="suggestion-track" onClick={handleSetTrack}>
      {props.hasPreview ? (
        <button className="track-play-icon" onClick={playPreview}>
          <FontAwesomeIcon icon={["fas", "play-circle"]} size="2x" />
        </button>
      ) : (
        <div style={{justifySelf: "center", alignSelf: "center"}}>
        <FontAwesomeIcon icon={["fas", "times"]} size="2x" />
        </div>
      )}

      <div className="track-artist">{props.artist}</div>

      <div className="track-title">{props?.name ? props.name : ""}</div>

      <div>{props.album}</div>

      <div className="track-duration">{msToTime(props.duration)}</div>
      <img
        src={`${props.icon}`}
        alt={`${props.album}`}
        className="suggestion-icon"
      />
    </div>
  );
}
