import React, { useCallback, useContext, useEffect } from "react";
import Track from "./Track";
import LikedTrackButton from "./LikedTrackButton";
import Context from "../../Context";

export default function TracksContainer() {
  const { track } = useContext(Context);

  const renderTracks = useCallback(() => {
    return track.listOfTracksFromAPI.map((item, index) => (
      <div className="tracks" key={index + (track.listOfTracksFromAPI.length * 2)}>
        <Track
          key={index}
          num={index}
          name={item.track?.name ? item.track.name : ''}
          artists={item.track?.artists ? item.track.artists : ''}
          album={item.track?.album ? item.track.album : '' }
          id={item.track?.id ? item.track.id : ''}
          popularity={item.track?.popularity ? item.track.popularity : ''}
          explicit={item.track?.explicit ? item.track.explicit : ''}
          duration={item.track?.duration_ms ? item.track.duration_ms : ''}
          uri={item.track?.uri ? item.track.uri : ''}
          hasPreview={item.track.preview_url ? true : false}
        />
        <LikedTrackButton 
          key={index + track.listOfTracksFromAPI.length}
          num={index + track.listOfTracksFromAPI.length}
          id={item.track?.id ? item.track.id : ''} />
      </div>
    ));
  }, [track]);

  useEffect(() => {
    renderTracks();
  }, [renderTracks]);

  return <div className="tracks-container">{renderTracks()}</div>;
}
