import { FC, useState } from "react";
import MediaRtcHelper from "../../../infrastructure/web-rtc/media-rtc-helper";
import VideoState from "../../../utils/common/video-states";
import CallActions from "../call-actions/call-actions";
import ScreenShare from "../screen-share/screen-share";

const MeetingActions: FC = () => {
  const [videoState, setVideoState] = useState(VideoState.None);

  const handleVideoStateChange = async (newVideoState: VideoState) => {
    setVideoState(newVideoState);
    await MediaRtcHelper.processVideo(newVideoState);
  };

  return (
    <>
      <CallActions
        videoState={videoState}
        onVideoStateChange={handleVideoStateChange}
      ></CallActions>
      <div
        className="bottom-right d-flex justify-content-center align-items-center mr-3"
        style={{ height: "10vh" }}
      >
        <ScreenShare
          videoState={videoState}
          onVideoStateChange={handleVideoStateChange}
        ></ScreenShare>
        <div
          className="option-wrap cursor-pointer display-center"
          style={{ height: "10vh", position: "relative" }}
        >
          <div className="option-icon">
            <span className="material-icons">more_vert</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingActions;
