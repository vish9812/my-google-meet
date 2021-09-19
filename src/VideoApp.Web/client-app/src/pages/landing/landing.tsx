import "./landing.css";

import React from "react";
import LandingHeader from "./landing-header";
import LandingBody from "./landing-body";
import LandingFooter from "./landing-footer";
import useFocus from "../../utils/hooks/useFocus";
import { useHistory } from "react-router-dom";
import Helper from "../../utils/helper";

const Landing = () => {
  const [meetingIdRef, setMeetingIdRefFocus] = useFocus();
  const history = useHistory();

  const getMeetingId = () => meetingIdRef.current?.value || "";

  const handleJoinMeeting = () => {
    if (getMeetingId()) {
      navigateToMeeting();
    } else {
      setMeetingIdRefFocus();
    }
  }

  const navigateToMeeting = () => {
    const meetingId = getMeetingId() || Helper.getRandomDigits();
    history.push("/meeting/" + meetingId);
  }

  return (
    <>
      <div className="landing-container">
        <LandingHeader
          onJoinMeeting={handleJoinMeeting}
          onNewMeeting={navigateToMeeting}
        ></LandingHeader>
        <LandingBody
          meetingIdRef={meetingIdRef}
          onJoinMeeting={handleJoinMeeting}
          onNewMeeting={navigateToMeeting}
        ></LandingBody>
        <LandingFooter></LandingFooter>
      </div>
    </>
  )
}

export default Landing;