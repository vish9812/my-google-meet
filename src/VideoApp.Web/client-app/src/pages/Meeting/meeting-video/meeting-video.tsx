import React, { FC } from "react";
import Auth from "../../../auth/auth";
import LoggedInUser from "../users/logged-in-user";
import OtherUser from "../users/other-user";

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
        <div className="w-75 d-none">
          <div className="call-wrap" style={{ backgroundColor: "black" }}>
            <div
              className="video-wrap"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              <LoggedInUser userId={loggedInUser}></LoggedInUser>
              {otherUsers.map((u) => (
                <OtherUser key={u} userId={u}></OtherUser>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingVideo;
