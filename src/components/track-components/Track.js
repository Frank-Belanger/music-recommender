import React, { useContext } from "react";
import msToTime from "../../helpers/msToTime";
import Context from "../../Context";

export default function Track(props) {
  const { FontAwesomeIcon, track, setTrack, setPlayer, audio, setAudio } = useContext(Context);

  function handleSetTrack() {
    setTrack({
      selectedTrack: track.listOfTracksFromAPI[props.num].track,
      hasPreview: track.listOfTracksFromAPI[props.num].track.preview_url
        ? true
        : false,
      listOfTracksFromAPI: track.listOfTracksFromAPI,
    });
  }

  function playPreview() {
    setAudio(new Audio(track.listOfTracksFromAPI[props.num].track.preview_url));
    audio.play();    
    setPlayer({ isPlaying: true, state: "playing" });
  };

  return (
    <div className="track" onClick={handleSetTrack}>
      {props.hasPreview ? (
        <button className="track-play-icon" onClick={playPreview}>
          <FontAwesomeIcon icon={["fas", "play-circle"]} />
        </button>
      ) : (
        <div style={{justifySelf: "center", alignSelf: "center"}}>
        <FontAwesomeIcon icon={["fas", "times"]}/>
        </div>
      )}

      <div className="track-artist">
        {props.artists[0]?.name ? props.artists[0].name : ""}
      </div>

      <div className="track-title">{props?.name ? props.name : ""}</div>

      <div style={{ fontStyle: "italic" }}>
        {props.explicit ? "Explicit" : ""}
      </div>

      <div className="track-duration">{msToTime(props.duration)}</div>
    </div>
  );
}
