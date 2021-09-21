import { FC } from "react";

interface LoggedInUserProps {
  userId: string;
}

const LoggedInUser: FC<LoggedInUserProps> = ({ userId }) => {
  return (
    <div className="userbox display-center flex-column">
      <h2 className="display-center" style={{ fontSize: "14px" }}>
        {userId}
      </h2>
      <div className="display-center">
        <video autoPlay muted></video>
      </div>
    </div>
  );
};

export default LoggedInUser;
