import SignalRHelper from "../../infrastructure/signalr-helper";
import MeetingEventsCallbacks from "./models/meeting-events-callbacks";

export default class MeetingHelper extends SignalRHelper {
  static async userJoining(
    userId: string,
    meetingId: string
  ): Promise<string[]> {
    try {
      const users: string[] = await this.connection.invoke(
        "userJoining",
        userId,
        meetingId
      );
      console.log("users>>>>", users);

      return users;
    } catch (err) {
      console.error("Failed: User Joined>>>", err);
      return [];
    }
  }

  static subscribeToMeetingEvents({
    onUserJoined,
  }: MeetingEventsCallbacks): void {
    this.connection.on("userJoined", (userId) => {
      console.log("Successfully joined>>>", userId);
      onUserJoined(userId);
    });

    this.connection.on("userLeft", (msg) => {
      console.log("Successfully left>>>", msg);
    });

    this.connection.on("userGotDisconnected", (msg) => {
      console.log("Probably, mistakenly, userGotDisconnected>>>", msg);
    });
  }
}
