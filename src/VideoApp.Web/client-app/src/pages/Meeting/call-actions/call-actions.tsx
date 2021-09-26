import { FC, useState } from "react";
import MediaRtcHelper from "../../../infrastructure/web-rtc/media-rtc-helper";
import VideoState from "../../../utils/common/video-states";

interface CallActionsProps {
  videoState: VideoState;
  onVideoStateChange: (videoState: VideoState) => void;
}

const CallActions: FC<CallActionsProps> = ({
  videoState,
  onVideoStateChange,
}) => {
  const [isMute, setIsMute] = useState(true);
  const [isCamOff, setIsCamOff] = useState(true);

  const handleMicToggle = async () => {
    MediaRtcHelper.processAudio(!isMute);
    setIsMute(!isMute);
  };

  const handleVideoToggle = () => {
    const newVideoState =
      videoState === VideoState.Camera ? VideoState.None : VideoState.Camera;
    onVideoStateChange(newVideoState);
    setIsCamOff(newVideoState === VideoState.None);
  };

  return (
    <>
      <div
        className="bottom-middle d-flex justify-content-center align-items-center"
        style={{ height: "10vh" }}
      >
        <div
          className="mic-toggle-wrap action-icon-style display-center mr-2 cursor-pointer"
          onClick={handleMicToggle}
        >
          <span className="material-icons">{isMute ? "mic_off" : "mic"}</span>
        </div>
        <div className="end-call-wrap action-icon-style display-center mr-2 cursor-pointer">
          <span className="material-icons text-danger">call</span>
        </div>
        <div
          className="video-toggle-wrap action-icon-style display-center cursor-pointer"
          onClick={handleVideoToggle}
        >
          <span className="material-icons">
            {isCamOff ? "videocam_off" : "videocam"}
          </span>
        </div>
      </div>
    </>
  );
};

export default CallActions;
