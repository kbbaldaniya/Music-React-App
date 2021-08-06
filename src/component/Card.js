import React, { useState, useEffect } from "react";
import "./Card.css";
import WishList from "./WishList";
import PlayList from "./PlayList";
import { RiPlayListLine } from "react-icons/ri";
import { TiInfoLargeOutline } from "react-icons/ti";
import { FaPlay, FaPause } from "react-icons/fa";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import { BsHeartFill } from "react-icons/bs";
import PlayBar from "./PlayBar";
import Detail from "./Detail";
import CDFrame from "../Image/cdframe.png";
import Aud_1 from "../Music/Zara Zara.mp3";
import Aud_2 from "../Music/Master-theme.mp3";
import Aud_3 from "../Music/Jack-sparrow.mp3";
import Aud_4 from "../Music/SCAM 1992.mp3";
import Aud_5 from "../Music/Thank-you.mp3";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const Songs = [
  { id: 1, name: "Zara Zara", src: Aud_1 },
  { id: 2, name: "Master-theme", src: Aud_2 },
  { id: 3, name: "Jack-sparrow", src: Aud_3 },
  { id: 4, name: "SCAM 1992", src: Aud_4 },
  { id: 5, name: "Thank-you", src: Aud_5 },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Card = () => {
  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [clickedTime, setClickedTime] = useState();
  const [play, setPlay] = useState(false);
  const [curTrack, setcurTrack] = useState(Songs[1]);
  const [id, setId] = useState("");
  const [detailDialog, setDetailDialog] = useState(false);
  const [wishListDialog, setWishListDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [wishListBtn, setwishListBtn] = useState(false);

  useEffect(() => {
    const aud = document.getElementById("audio");
    const setAudioData = () => {
      setDuration(aud.duration);
      setCurTime(aud.currentTime);
    };
    const setAudioTime = () => setCurTime(aud.currentTime);
    aud.addEventListener("loadeddata", setAudioData);
    aud.addEventListener("timeupdate", setAudioTime);

    play ? aud.play() : aud.pause();
    if (clickedTime && clickedTime !== curTime) {
      aud.currentTime = clickedTime;
      setClickedTime(null);
    }
    return () => {
      aud.removeEventListener("loadeddata", setAudioData);
      aud.removeEventListener("timeupdate", setAudioTime);
    };
  }, [play, clickedTime, curTime]);

  const handlePlayer = () => {
    const aud = document.getElementById("audio");
    !play ? aud.play() : aud.pause();
    setPlay((play) => !play);
  };

  const handlePlay = (e, song) => {
    setPlay((play) => !play);
    setId(song.id);
    setcurTrack(song);
  };

  const handlePrevious = () => {
    const currentTrackIndex = Songs.findIndex((track) => track === curTrack);
    const tracksValue = Songs.length - 1;
    const previousTrack =
      currentTrackIndex === 0 ? tracksValue : currentTrackIndex - 1;
    const trackToPlay = Songs[previousTrack];
    setcurTrack(trackToPlay);
  };
  const handleNext = () => {
    const currentTrackIndex = Songs.findIndex((track) => track === curTrack);
    const tracksValue = Songs.length - 1;
    const nextTrack =
      currentTrackIndex === tracksValue ? 0 : currentTrackIndex + 1;
    const trackToPlay = Songs[nextTrack];
    setcurTrack(trackToPlay);
  };

  const handleDetail = () => {
    setDetailDialog(true);
  };

  const handleListOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setWishListDialog(false);
    setDetailDialog(false);
  };

  const handlewishListBtn = (e, song) => {
    setwishListBtn(true);

    const WishListArr = [];
    WishListArr.push(document.querySelector("#heart" + song.id).id);
    WishListArr.map((x) => {
      document.getElementById(x).style.color = "#b50e0ed4";
    });

    const addItem = wishList.findIndex((arr) => arr.id === song.id);
    addItem === -1 && setWishList([...wishList, song]);
  };

  const handleWishList = () => {
    setWishListDialog(true);
  };

  const handleRemove = (e, song) => {
    setwishListBtn(false);
    const RemoveItem = wishList.filter((item) => item.id !== song.id);
    setWishList(RemoveItem);
  };

  return (
    <div>
      <div className="container">
        <div>
          <span>Now Playing</span>
          <hr />
          <div>
            <img className="photo" src={CDFrame} alt="cd" />
          </div>
          <h2>{curTrack.name}</h2>
          <div className="playBar">
            <audio id="audio" src={curTrack.src} />
            <PlayBar
              curTime={curTime}
              duration={duration}
              curAud={curTrack.src}
              onTimeUpdate={(time) => setClickedTime(time)}
            />
          </div>
          <div className="playButton">
            <button className="button" onClick={handlePrevious}>
              <FiChevronsLeft />
            </button>
            <button className="button" onClick={handlePlayer}>
              {play ? <FaPause /> : <FaPlay />}
            </button>
            <button className="button" onClick={handleNext}>
              <FiChevronsRight />
            </button>
          </div>
          <hr />
        </div>
        <div>
          <div className="header">
            <button className="button" onClick={handleDetail}>
              <TiInfoLargeOutline />
            </button>
            <button className="button" onClick={handleWishList}>
              <BsHeartFill style={{ color: "#b50e0ed4" }} />
            </button>
            <button className="button" onClick={handleListOpen}>
              <RiPlayListLine />
            </button>
          </div>
          <Dialog
            open={detailDialog}
            onClose={handleClose}
            TransitionComponent={Transition}
            style={{
              paper: { border: "1px solid #464444", borderRadius: "15px" },
            }}
          >
            <Detail curTrack={curTrack} />
          </Dialog>
          <Dialog
            open={wishListDialog}
            onClose={handleClose}
            TransitionComponent={Transition}
            style={{
              paper: { border: "1px solid #464444", borderRadius: "15px" },
            }}
          >
            <div
              className="list"
              style={{
                background:
                  "linear-gradient(to bottom, rgb(66 6 6), rgb(0, 0, 26))",
              }}
            >
              <h3>Favorites</h3>
              <hr />
              {wishList.length === 0 ? (
                <div>
                  <h1>List is Empty</h1>
                </div>
              ) : (
                <WishList
                  wishList={wishList}
                  play={play}
                  id={id}
                  handlePlay={handlePlay}
                  handleRemove={handleRemove}
                />
              )}
            </div>
          </Dialog>
          <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            style={{
              paper: { border: "1px solid #464444", borderRadius: "15px" },
            }}
          >
            <PlayList
              songs={Songs}
              play={play}
              id={id}
              handlePlay={handlePlay}
              wishListBtn={wishListBtn}
              handlewishListBtn={handlewishListBtn}
              handleRemove={handleRemove}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Card;
