import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import DVDImg from "../Image/Dvd.ico";

const WishList = (props) => {
  const wishListItems = props.wishList.map((song) => (
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
          <MdClose
            style={{ color: "#b50e0ed4" }}
            onClick={(e) => props.handleRemove(e, song)}
          />
        </button>
      </div>
    </div>
  ));

  return <div>{wishListItems}</div>;
};

export default WishList;
