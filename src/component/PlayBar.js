import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

const PlayBar = (props) => {
  const { duration, curTime, onTimeUpdate } = props;

  const curPercentage = (curTime / duration) * 100;

  const formatDuration = (duration) => {
    return moment
      .duration(duration, "seconds")
      .format("mm:ss", { trim: false });
  };

  const calcClickedTime = (e) => {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".progressBar");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  };

  const handleTimeDrag = (e) => {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove) => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  };

  return (
    <div className="bar">
      <span className="barTime">{formatDuration(curTime)}</span>
      <div
        className="progressBar"
        style={{
          background: `linear-gradient(to right, #5431b5f7 ${curPercentage}%, #ffffff75 0)`,
        }}
        onMouseDown={(e) => handleTimeDrag(e)}
      >
        <span
          className="progressBarPoint"
          style={{ left: `${curPercentage - 1}%` }}
        />
      </div>
      <span className="barTime">{formatDuration(duration - curTime)}</span>
    </div>
  );
};

export default PlayBar;
