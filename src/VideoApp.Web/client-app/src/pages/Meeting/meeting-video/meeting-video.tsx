import React from "react";

const MeetingVideo = () => {
  return (
    <>
      <div className="top-remote-video-show-wrap d-flex">
        <div className="w-75 d-none">
          <div className="call-wrap" style={{ backgroundColor: "black" }}>
            <div className="video-wrap" style={{ display: "flex", flexWrap: "wrap" }}>
              <div className="userbox display-center flex-column">
                <h2 className="display-center" style={{ fontSize: "14px" }}></h2>
                <div className="display-center">
                  <video autoPlay muted></video>
                </div>
              </div>
              <div className="userbox display-center flex-column" style={{ display: "none" }}>
                <h2 className="display-center" style={{ fontSize: "14px" }}></h2>
                <div className="display-center">
                  <video autoPlay muted></video>
                  <audio autoPlay muted controls style={{ display: "none" }}></audio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MeetingVideo;