import React from "react";

const CallActions = () => {
  return (
    <>
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
    </>
  )
}

export default CallActions;