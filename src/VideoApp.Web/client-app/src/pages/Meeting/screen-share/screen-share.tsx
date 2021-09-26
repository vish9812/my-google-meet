import { FC } from "react";
import VideoState from "../../../utils/common/video-states";

interface ScreenShareProps {
  videoState: VideoState;
  onVideoStateChange: (videoState: VideoState) => void;
}

const ScreenShare: FC<ScreenShareProps> = ({
  videoState,
  onVideoStateChange,
}) => {
  const handleScreenShareChange = () => {
    const newVideoState =
      videoState === VideoState.ScreenShare
        ? VideoState.None
        : VideoState.ScreenShare;
    onVideoStateChange(newVideoState);
  };

  return (
    <>
      <div
        className="present-now-wrap d-flex justify-content-center flex-column align-items-center mr-5 cursor-pointer"
        onClick={handleScreenShareChange}
      >
        <span className="material-icons">present_to_all</span>
        <div>Present Now</div>
      </div>
    </>
  );
};

export default ScreenShare;
