import "./landing.css";

import React from "react";

interface LandingBodyProps {
  meetingIdRef: React.MutableRefObject<HTMLInputElement | null>;

  onJoinMeeting: () => void;
  onNewMeeting: (meetingId?: string) => void;
}

const LandingBody = ({
  meetingIdRef,
  onJoinMeeting,
  onNewMeeting,
}: LandingBodyProps) => {
  const handleJoinMeeting = () => {
    onJoinMeeting();
  };

  const handleNewMeeting = () => {
    onNewMeeting();
  };

  const handleMeetingCodeKeyUp = (
    event?: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event && event.key === "Enter") {
      handleJoinMeeting();
    }
  };

  return (
    <>
      <main className="landing">
        <div className="jumbotron h-100 d-flex">
          <div className="container w-50">
            <h1 style={{ fontSize: "3rem" }}>
              Premium video meetings. Now free for everyone.
            </h1>
            <p style={{ fontSize: "20px" }}>
              We re-engineered the service we built for secure business
              meetings, Google Meet, to make it free and available for all.
            </p>
            <ul className="display-center justify-content-start">
              <li style={{ padding: 0 }}>
                <button
                  className="btn btn-lg text-light font-weight-bold display-center"
                  style={{ backgroundColor: "#01796b" }}
                  onClick={handleNewMeeting}
                >
                  <span className="material-icons mr-2">video_call</span>New
                  Meeting
                </button>
              </li>
              <li className="pl-3">
                <button
                  className="btn btn-lg btn-outline-secondary text-dark font-weight-bold display-center"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <span className="material-icons mr-2">keyboard</span>
                  <input
                    type="text"
                    placeholder="Enter a code"
                    style={{ border: "none" }}
                    ref={meetingIdRef}
                    onKeyUp={handleMeetingCodeKeyUp}
                  />
                </button>
              </li>
              <li
                className="text-dark pl-2 font-weight-bold cursor-pointer"
                onClick={handleJoinMeeting}
              >
                Join
              </li>
            </ul>
          </div>
          <div className="container w-50">
            <img
              src="/img/google-meet-people.jpg"
              alt="people"
              className="landing-image"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingBody;
