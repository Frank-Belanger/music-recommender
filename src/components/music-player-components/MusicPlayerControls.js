import React, { useCallback, useContext, useEffect, useState } from "react";
import TimeTrack from "./TimeTrack";

import msToTime from "../../helpers/msToTime";
import Context from "../../Context";

export default function MusicPlayerControls() {
  const {
    FontAwesomeIcon,
    track,
    player,
    setPlayer,
    audio,
    setAudio,
  } = useContext(Context);

  const [ currentTime, setCurrentTime ] = useState(0);

  const play = () => {
    setPlayer({ isPlaying: true, state: "playing" });
  };

  const stop = () => {
    setPlayer({ isPlaying: false, state: "stopped" });
  };

  const pause = () => {
    setPlayer({ isPlaying: !player.isPlaying, state: "paused" });
  };

  const renderTimeTrack = useCallback(() => {
    return (
      <TimeTrack
        currentTime={currentTime || 0}
        duration={audio?.duration || 0}
      />
    );
  }, [audio, currentTime]);

  useEffect(() => {
    if (player.state === "stopped") {
      setAudio(new Audio(track.selectedTrack?.preview_url));
    }
  }, [setAudio, track.selectedTrack.preview_url, player.state]);

  useEffect(() => {
    if (audio.constructor !== Object) {
      player.isPlaying ? audio.play() : audio.pause();
    }
    return () => {
        if (audio.constructor !== Object) {
            audio.pause();
        }
    }
  }, [player.isPlaying, audio]);

  useEffect(() => {
    if (audio.constructor !== Object) {
    audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime); 
      });
    }
  }, [audio])

  useEffect(() => {
    renderTimeTrack();
  }, [renderTimeTrack, audio?.currentTime, audio?.duration]);

  return (
    <div
      className={`music-player-controls ${
        track.hasPreview ? "preview" : "no-preview"
      }`}
    >
      <div className="current-time">0:00</div>

      <div className="time-track-container">{renderTimeTrack()}</div>

      <div className="track-duration">
        {msToTime(track.selectedTrack?.duration_ms)}
      </div>
      <div className="music-player-control-bar">
        <button
          className={`stop${
            player.state === "stopped" && track.selectedTrack?.preview_url
              ? " active-button"
              : ""
          }${track.selectedTrack?.preview_url 
            ? ""
            : " inactive"
        }`}
          onClick={stop}
        >
          <FontAwesomeIcon icon={["fas", "stop"]} />
        </button>
        {track.selectedTrack?.preview_url ? (
          <button
            className={`play ${
              player.state === "playing" ? "active-button" : ""
            }`}
            onClick={play}
          >
            <FontAwesomeIcon icon={["fas", "play"]} />
          </button>
        ) : (
          <button className="inactive">
            <FontAwesomeIcon icon={["fas", "times"]} />
          </button>
        )}
        <button
          className={`pause${
            player.state === "paused" ? " active-button" : ""
          }${track.selectedTrack?.preview_url ? "" : " inactive"}`}
          onClick={pause}
        >
          <FontAwesomeIcon icon={["fas", "pause"]} />
        </button>
      </div>
    </div>
  );
}
