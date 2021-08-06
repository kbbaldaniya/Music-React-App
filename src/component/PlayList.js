import React from "react";
import "./PlayList.css";
import DVDImg from "../Image/Dvd.ico";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";

const PlayList = (props) => {
  const listItems = props.songs.map((song, id) => (
    <div className="box" key={song.id}>
      <div className="box_content">
        <img src={DVDImg} alt="" width="40px" height="45px" />
        <span className="text">{song.name}</span>
      </div>
      <div className="listbtns">
        <button
          className="listButton"
          onClick={(e) => props.handlePlay(e, song)}
        >
          {props.play && props.id === song.id ? <FaPause /> : <FaPlay />}
        </button>
        <button className="listButton">
          <BsHeart
            id={"heart" + song.id}
            onClick={(e) => props.handlewishListBtn(e, song)}
          />
        </button>
      </div>
    </div>
  ));

  return (
    <div
      className="list"
      style={{
        background: "linear-gradient(to bottom, rgb(52 6 70), rgb(0, 0, 26))",
      }}
    >
      <h3>Playlist</h3>
      <hr />
      {listItems}
    </div>
  );
};

export default PlayList;
