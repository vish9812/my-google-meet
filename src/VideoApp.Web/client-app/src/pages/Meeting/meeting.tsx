import "./meeting.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MeetingVideo from "./meeting-video/meeting-video";
import MeetingInfo from "./meeting-info/meeting-info";
import Auth from "../../auth/auth";
import SignalRHelper from "../../infrastructure/signalr-helper";
import MeetingHelper from "./meeting-helper";

const Meeting = () => {
  Auth.promptForUserId();

  const { meetingId } = useParams<{ meetingId: string }>();

  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const startConnection = async () => {
      await SignalRHelper.start();
      const allUsers = await MeetingHelper.userJoining(
        Auth.getUserId(),
        meetingId
      );
      setUsers(allUsers);
    };

    SignalRHelper.initConnection();
    MeetingHelper.subscribeToMeetingEvents({
      onUserJoined: handleUserJoined,
    });

    startConnection();
  }, [meetingId]);

  const handleUserJoined = (userId: string) => {
    setUsers([...users, userId]);
  };

  return (
    <>
      <main className="d-flex flex-column home-wrap">
        <div className="g-top text-light"></div>
        <MeetingVideo users={users}></MeetingVideo>
        <MeetingInfo></MeetingInfo>
      </main>
    </>
  );
};

export default Meeting;
