import React, { useCallback, useContext, useEffect } from "react";
import Context from "../../Context";
import SuggestionTracks from "./SuggestionTracks";

export default function SuggestionBox() {
  const { suggestions } = useContext(Context);

  const renderSuggestions = useCallback(() => {
    if (suggestions.listOfTracksFromAPI?.length !== 0) {
      return suggestions.listOfTracksFromAPI.map((item, index) => (
        <SuggestionTracks
          key={index}
          num={index}
          name={item.name}
          artist={item.artists[0].name}
          album={item.album.name}
          id={item.id}
          href={item.href}
          duration={item.duration_ms}
          hasPreview={item.preview_url ? true : false}
          icon={
            item.album.images[2]?.url
              ? item.album.images[2].url
              : "../../../public/spotify-logo.jpg"
          }
        />
      ));
    } else {
      return (
        <div className="category-missing-message suggestion-message">
          {"Once you like a song, suggestions will appear here."}
        </div>
      );
    }
  }, [suggestions]);

  useEffect(() => {
    renderSuggestions();
  }, [renderSuggestions]);

  return (
    <div className="suggestion-container">
      <h1>Suggestions</h1>
      {suggestions.listOfTracksFromAPI?.length !== 0 ? (
        <div className="suggestions-header">
          <div className="artist">Artist</div>
          <div className="title">Title</div>
          <div className="album">Album</div>
        </div>
      ) : (
        ""
      )}
      <div className="suggestion-tracks-container">{renderSuggestions()}</div>
    </div>
  );
}
