import "./meeting.css";

import React from "react";
import { useParams } from "react-router-dom";

const Meeting = () => {
  const { meetingId } = useParams<{ meetingId: string }>();

  return (
    <>
      <main className="d-flex flex-column home-wrap">
        <div className="g-top text-light"></div>
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
        <div className="g-top-left bg-light text-secondary w-25 d-flex align-items-center justify-content-between pl-2 pr-2">
          <div className="top-left-participant-wrap pt-2 cursor-pointer">
            <div className="top-left-participant-icon">
              <span className="material-icons">people</span>
            </div>
            <div className="top-left-participant-count"></div>
          </div>
          <div className="top-left-chat-wrap pt-2 cursor-pointer">
            <span className="material-icons">message</span>
          </div>
          <div className="top-left-time-wrap"></div>
        </div>
        <div className="g-bottom bg-light m-0 d-flex justify-content-between align-items-center">
          <div className="bottom-left d-flex" style={{ height: "10vh" }}>
            <div className="display-center cursor-pointer meeting-details-button">
              Meeting Details<span className="material-icons">keyboard_arrow_down</span>
            </div>
          </div>
          <div className="bottom-middle d-flex justify-content-center align-items-center" style={{ height: "10vh" }}>
            <div className="mic-toggle-wrap action-icon-style display-center mr-2 cursor-pointer">
              <span className="material-icons">mic_off</span>
            </div>
            <div className="end-call-wrap action-icon-style display-center mr-2 cursor-pointer">
              <span className="material-icons text-danger">call</span>
            </div>
            <div className="video-toggle-wrap action-icon-style display-center cursor-pointer">
              <span className="material-icons">videocam_off</span>
            </div>
          </div>
          <div className="bottom-right d-flex justify-content-center align-items-center mr-3" style={{ height: "10vh" }}>
            <div className="present-now-wrap d-flex justify-content-center flex-column align-items-center mr-5 cursor-pointer">
              <span className="material-icons">present_to_all</span>
              <div>Present Now</div>
            </div>
            <div className="option-wrap cursor-pointer display-center" style={{ height: "10vh", position: "relative" }}>
              <div className="option-icon">
                <span className="material-icons">more_vert</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>);
}

export default Meeting;