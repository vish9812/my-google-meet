import { FC } from "react";
import Auth from "../../../auth/auth";

interface UserVideoProps {
  userId: string;
}

const UserVideo: FC<UserVideoProps> = ({ userId }) => {
  const isLoggedInUser = Auth.getUserId() === userId;

  return (
    <div className="userbox display-center flex-column">
      <h2 className="display-center" style={{ fontSize: "14px" }}>
        {`${userId} ${isLoggedInUser ? "(Me)" : ""}`}
      </h2>
      <div className="display-center">
        <video id={`video_${userId}`} playsInline autoPlay muted></video>
        {!isLoggedInUser && (
          <audio id={`audio_${userId}`} playsInline autoPlay controls></audio>
        )}
      </div>
    </div>
  );
};

export default UserVideo;
