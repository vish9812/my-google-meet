import { FC } from "react";

interface OtherUserProps {
  userId: string;
}

const OtherUser: FC<OtherUserProps> = ({ userId }) => {
  return (
    <div className="userbox display-center flex-column other">
      <h2 className="display-center" style={{ fontSize: "14px" }}>
        {userId}
      </h2>
      <div className="display-center">
        <video autoPlay muted></video>
        <audio autoPlay muted controls style={{ display: "none" }}></audio>
      </div>
    </div>
  );
};

export default OtherUser;
