import React, { FC } from "react";
import Auth from "../../../auth/auth";
import UserVideo from "./user-video";

interface MeetingVideoProps {
  users: string[];
}

const MeetingVideo: FC<MeetingVideoProps> = ({ users }) => {
  const loggedInUser = Auth.getUserId();
  const otherUsers = users.filter((u) => u !== loggedInUser);

  console.log("LoggedIn>>>>", loggedInUser);
  console.log("Others>>>>>", otherUsers);

  return (
    <>
      <div className="top-remote-video-show-wrap d-flex">
        <div className="w-75">
          <div className="call-wrap" style={{ backgroundColor: "black" }}>
            <div className="video-wrap">
              <UserVideo userId={loggedInUser}></UserVideo>
              {otherUsers.map((u) => (
                <UserVideo key={u} userId={u}></UserVideo>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingVideo;
