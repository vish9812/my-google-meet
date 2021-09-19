import React from "react";
import { useParams } from "react-router-dom";

const Meeting = () => {
  const { meetingId } = useParams<{ meetingId: string }>();

  return (
    <>
      <h1>My new meeting with id: {meetingId}</h1>
    </>);
}

export default Meeting;