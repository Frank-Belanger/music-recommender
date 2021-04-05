import React, { useContext } from "react";
import Context from '../../Context';

export default function LikedTrackButton(props) {
  const { FontAwesomeIcon, likedTrack, setLikedTrack } = useContext(Context);

  const handleLike = () => {
    if (likedTrack.includes(props.id)) {
      setLikedTrack(likedTrack.filter((item) => item !== props.id));
    } else {
      if (likedTrack.length >= 5) {
        setLikedTrack((oldArray) => oldArray.slice(1));
        setLikedTrack((oldArray) => [...oldArray, props.id]);
      } else {
        setLikedTrack((oldArray) => [...oldArray, props.id]);
      }
    }
  };

  return (
    <div className="track-like" onClick={handleLike}>
      {likedTrack.includes(props.id) ? (
        <button className="like-button">
          <FontAwesomeIcon icon={["fas", "heart"]} />
        </button>
      ) : (
        <button className="like-button">
          <FontAwesomeIcon icon={["far", "heart"]} />
        </button>
      )}
    </div>
  );
}
