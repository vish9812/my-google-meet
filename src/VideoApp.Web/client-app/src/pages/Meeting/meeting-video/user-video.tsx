import { FC, useEffect, useRef } from "react";
import Auth from "../../../auth/auth";

interface UserVideoProps {
  userId: string;
}

const UserVideo: FC<UserVideoProps> = ({ userId }) => {
  const loggedInUserId = Auth.getUserId();
  const isLoggedInUser = loggedInUserId === userId;

  const videoRef = useRef<HTMLVideoElement>(null);

  // useEffect(() => {
  //   if (videoStream && videoRef?.current) {
  //     videoRef.current.srcObject = videoStream;
  //   }
  // }, [videoStream]);

  return (
    <div className="userbox display-center flex-column">
      <h2 className="display-center" style={{ fontSize: "14px" }}>
        {`${userId} ${isLoggedInUser ? "(Me)" : ""}`}
      </h2>
      <div className="display-center">
        <video id={`video_${userId}`} autoPlay muted ref={videoRef}></video>
        {!isLoggedInUser && (
          <audio id={`audio_${userId}`} autoPlay muted controls></audio>
        )}
      </div>
    </div>
  );
};

export default UserVideo;
