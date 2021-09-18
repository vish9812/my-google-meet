import './App.css';
import logo from './logo.png';

import React, { createRef, useState } from 'react';
import { HubConnectionBuilder } from "@microsoft/signalr";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Landing from './pages/landing/landing';

const App = () => {
  const [joinMeetingClickCount, setJoinMeetingClickCount] = useState(0);
  // const inputField = createRef<HTMLInputElement>();
  // const username = new Date().getTime();

  // const connection = new HubConnectionBuilder()
  //   .withUrl("/hub")
  //   .build();

  // connection.on("messageReceived", (username: string, message: string) => {
  //   console.log(`Received <<<<${message}>>>> from ${username}`);
  // });

  // connection.start().catch(err => console.error("Connection start error>>>>", err));

  // const handleMessageKeyUp = (event: any) => {
  //   console.log("Change Message>>>>", event);
  //   if (event.key === "Enter") {
  //     send();
  //   }
  // }

  // const send = () => {
  //   console.log("Send called>>>", inputField.current!.value);
  //   connection.send("newMessage", username, inputField.current!.value)
  //     // .then(() => setMessage(""))
  //     .catch(err => console.error("Sending Message Failed>>>>", err));
  // }

  const handleJoinMeeting = () => {
    setJoinMeetingClickCount(joinMeetingClickCount + 1);
  }

  return (
    <div className="App">
      {/* <div>User: {username}</div>
      <div>
        <input
          type="text"
          defaultValue="test"
          onKeyUp={handleMessageKeyUp}
          ref={inputField} />
      </div> */}

      <Header
        onJoinMeeting={handleJoinMeeting}></Header>

      <Landing
        joinMeetingClickCount={joinMeetingClickCount}></Landing>

      <Footer></Footer>

    </div>
  );
}

export default App;
