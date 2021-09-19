import './App.css';

import React from 'react';

import { HubConnectionBuilder } from "@microsoft/signalr";
import Landing from './pages/landing/landing';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Meeting from './pages/Meeting/meeting';

const App = () => {


  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/meeting/:meetingId">
            <Meeting />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
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