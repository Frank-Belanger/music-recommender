import React from "react";

export default function TimeTrack(props) {
  return (
    <div
      className="time-track"
      style={{ 
          width: props.duration ? (props.currentTime / props.duration) * 100 + "%" 
          : "0px" 
        }}
    />
  );
}
