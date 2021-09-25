import "./meeting.css";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MeetingVideo from "./meeting-video/meeting-video";
import MeetingInfo from "./meeting-info/meeting-info";
import Auth from "../../auth/auth";
import SignalRHelper from "../../infrastructure/signalr-helper";
import MeetingHelper from "./meeting-helper";
import VideoHelper from "./video-helper";

const Meeting = () => {
  Auth.promptForUserId();

  const { meetingId } = useParams<{ meetingId: string }>();

  const [users, setUsers] = useState<string[]>([]);

  const usersRef = useRef<string[]>([]);
  usersRef.current = users;

  var a = 10;
  console.log(a);

  useEffect(() => {
    const startConnection = async () => {
      await SignalRHelper.start();
      const userId = Auth.getUserId();
      const otherUsers = await MeetingHelper.userJoining(userId, meetingId);
      console.log("got old ones>>>", otherUsers);
      setUsers([userId, ...otherUsers]);
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
    MeetingHelper.subscribeToEvents({
      onAnotherUserJoined: handleAnotherUserJoined,
      onUserLeft: handleUserLeft,
    });
    VideoHelper.subscribeToEvents();
    VideoHelper.init();

    startConnection();

    return () => {
      console.info("Cleaning up in useEffect>>>");
      MeetingHelper.unSubscribeFromEvents();
      VideoHelper.unSubscribeFromEvents();
      (async () => await MeetingHelper.stop())();
    };
  }, [meetingId]);

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
