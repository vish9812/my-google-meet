import { FC } from "react";
import MeetingActions from "./meeting-actions";

const MeetingInfo: FC = () => {
  return (
    <>
      <div className="g-top-left bg-light text-secondary w-25 d-flex align-items-center justify-content-between pl-2 pr-2">
        <div className="top-left-participant-wrap pt-2 cursor-pointer">
          <div className="top-left-participant-icon">
            <span className="material-icons">people</span>
          </div>
          <div className="top-left-participant-count">2</div>
        </div>
        <div className="top-left-chat-wrap pt-2 cursor-pointer">
          <span className="material-icons">message</span>
        </div>
        <div className="top-left-time-wrap"></div>
      </div>
      <div className="g-bottom bg-light m-0 d-flex justify-content-between align-items-center">
        <div className="bottom-left d-flex" style={{ height: "10vh" }}>
          <div className="display-center cursor-pointer meeting-details-button">
            Meeting Details
            <span className="material-icons">keyboard_arrow_down</span>
          </div>
        </div>
        <MeetingActions></MeetingActions>
      </div>
    </>
  );
};

export default MeetingInfo;
