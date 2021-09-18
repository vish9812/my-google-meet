import React from "react";

interface HeaderProps {
  onJoinMeeting: () => void;
}

const Header = ({ onJoinMeeting }: HeaderProps) => {
  const handleJoinMeetingClick = () => {
    onJoinMeeting();
  }

  return (
    <>
      <nav className="navbar navbar-expand-md fixed-top">
        <img src="/img/google-meet-icon.png" alt="logo" className="logo" />
        <a href="#" className="navbar-brand text-dark">Video Conference</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a href="#" className="nav-link">At a glance</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">How it works</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Plan and Price</a>
            </li>
          </ul>
          <ul className="navbar-nav mr-0">
            <li className="nav-item sign-in display-center">
              <a href="#" className="nav-link">Sign in</a>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-secondary btn-lg text-info font-weight-bold"
                onClick={handleJoinMeetingClick}
              >
                Join the meeting
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-lg btn-info text-light font-weight bold">
                Start a meeting
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Header;