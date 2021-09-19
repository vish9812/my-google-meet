import "./meeting.css";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MeetingVideo from "./meeting-video/meeting-video";
import MeetingInfo from "./meeting-info/meeting-info";
import Auth from "../../auth/auth";
import SignalRHelper from "../../infrastructure/signalr-helper";

const Meeting = () => {
  Auth.promptForUserId();

  const { meetingId } = useParams<{ meetingId: string }>();
  const userId = Auth.getUserId();

  const connection = SignalRHelper.getConnection();

  console.log("My Connection>>>>>", connection);
  useEffect(() => {
    const startConnection = async () => {
      await SignalRHelper.start();
    }

    startConnection();
  }, []);

  return (
    <>
      <main className="d-flex flex-column home-wrap">
        <div className="g-top text-light"></div>
        <MeetingVideo></MeetingVideo>
        <MeetingInfo></MeetingInfo>
      </main>
    </>);
}

export default Meeting;