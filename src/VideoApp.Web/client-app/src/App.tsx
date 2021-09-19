import './App.css';

import React from 'react';

import { HubConnectionBuilder } from "@microsoft/signalr";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Landing from './pages/landing/landing';
import { Route, Switch, useHistory } from 'react-router-dom';
import Meeting from './pages/Meeting/meeting';
import Helper from './utils/helper';
import useFocus from './utils/hooks/useFocus';

const App = () => {
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
    <div className="App">
      <Switch>
        <Route path="/meeting/:meetingId">
          <Meeting></Meeting>
        </Route>
        <Route path="/">
          <Header
            onJoinMeeting={handleJoinMeeting}
            onNewMeeting={navigateToMeeting}
          ></Header>
          <Landing
            meetingIdRef={meetingIdRef}
            onJoinMeeting={handleJoinMeeting}
            onNewMeeting={navigateToMeeting}
          ></Landing>
          <Footer></Footer>
        </Route>
      </Switch>
    </div>
  );
}

export default App;


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