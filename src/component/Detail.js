import React from "react";
import DVDImg from "../Image/Dvd.ico";

const Detail = (props) => {
  return (
    <div
      className="list"
      style={{
        background: "linear-gradient(to bottom,rgb(41 41 41), rgb(0, 0, 26))",
      }}
    >
      <h3>About</h3>
      <hr />
      <img src={DVDImg} alt="?img" />
      <h2>{props.curTrack.name}</h2>
    </div>
  );
};

export default Detail;
