import React, { useContext } from "react";
import PlaylistPic from "./PlaylistPic";
import PlaylistInfo from "./PlaylistInfo";

import Context from "../../Context";

export default function Playlists(props) {
  const { playlist, setPlaylist } = useContext(Context);

  function choosePlaylist() {
    setPlaylist({
      selectedPlaylist: playlist.listOfPlaylistsFromAPI[props.num],
      listOfPlaylistsFromAPI: playlist.listOfPlaylistsFromAPI,
    });
  }

  return (
    <div
      className={`chooser-playlist-button ${
        playlist.selectedPlaylist.id === props.id ? "focused-playlist" : ""
      }`}
      onClick={choosePlaylist}
    >
      <PlaylistPic icon={props.icon} name={props.name} />
      <PlaylistInfo name={props.name} id={props.id} href={props.href} />
    </div>
  );
}
