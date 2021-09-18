import './App.css';

import React, { createRef } from 'react';
import { HubConnectionBuilder } from "@microsoft/signalr";

const App = () => {
  const inputField = createRef<HTMLInputElement>();
  const username = new Date().getTime();

  const connection = new HubConnectionBuilder()
    .withUrl("/hub")
    .build();

  connection.on("messageReceived", (username: string, message: string) => {
    console.log(`Received <<<<${message}>>>> from ${username}`);
  });

  connection.start().catch(err => console.error("Connection start error>>>>", err));

  const handleMessageKeyUp = (event: any) => {
    console.log("Change Message>>>>", event);
    if (event.key === "Enter") {
      send();
    }
  }

  const send = () => {
    console.log("Send called>>>", inputField.current!.value);
    connection.send("newMessage", username, inputField.current!.value)
      // .then(() => setMessage(""))
      .catch(err => console.error("Sending Message Failed>>>>", err));
  }

  return (
    <div className="App">
      <div>User: {username}</div>
      <div>
        <input
          type="text"
          defaultValue="test"
          onKeyUp={handleMessageKeyUp}
          ref={inputField} />
      </div>
    </div>
  );
}

export default App;
