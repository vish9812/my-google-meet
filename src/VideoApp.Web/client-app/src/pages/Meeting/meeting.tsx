import "./meeting.css";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import UsersVideosList from "./meeting-video/users-videos-list";
import MeetingInfo from "./meeting-info/meeting-info";
import Auth from "../../auth/auth";
import SignalRHelper from "../../infrastructure/signalr/signalr-helper";
import VideoSignalR from "../../infrastructure/signalr/video-signalr";
import MeetingSignalR from "../../infrastructure/signalr/meeting-signalr";

const Meeting = () => {
  Auth.promptForUserId();

  const { meetingId } = useParams<{ meetingId: string }>();

  const [users, setUsers] = useState<string[]>([]);

  const usersRef = useRef<string[]>([]);
  usersRef.current = users;

  useEffect(() => {
    const startConnection = async () => {
      await SignalRHelper.start();

      const userId = Auth.getUserId();
      const othersInMeeting = await MeetingSignalR.userJoining(
        userId,
        meetingId
      );

      console.log("got old ones>>>", othersInMeeting);

      setUsers([userId, ...othersInMeeting]);
    };

    const handleAnotherUserJoined = (anotherUserId: string) => {
      console.log("got new one>>>", anotherUserId);
      console.log("combining with oldies>>>>", usersRef.current);

      setUsers([...usersRef.current, anotherUserId]);
    };

    const handleUserLeft = (userId: string) => {
      console.log("oldie left>>>", userId);
      const remainingUsers = usersRef.current.filter((u) => u !== userId);
      setUsers(remainingUsers);
    };

    SignalRHelper.initConnection();
    MeetingSignalR.subscribeToEvents({
      onAnotherUserJoined: handleAnotherUserJoined,
      onUserLeft: handleUserLeft,
    });
    VideoSignalR.subscribeToEvents();
    VideoSignalR.init();

    startConnection();

    return () => {
      console.info("Cleaning up in useEffect>>>");
      MeetingSignalR.unSubscribeFromEvents();
      VideoSignalR.unSubscribeFromEvents();
      (async () => await MeetingSignalR.stop())();
    };
  }, [meetingId]);

  return (
    <>
      <main className="d-flex flex-column home-wrap">
        <div className="g-top text-light">
          <UsersVideosList users={users}></UsersVideosList>
        </div>
        <MeetingInfo></MeetingInfo>
      </main>
    </>
  );
};

export default Meeting;
