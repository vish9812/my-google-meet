import SignalRHelper from "../../infrastructure/signalr-helper";
import WebRtc from "../../infrastructure/web-rtc-helper";
import MeetingEventsCallbacks from "./models/meeting-events-callbacks";

export default class MeetingHelper extends SignalRHelper {
  private static eventNames = {
    anotherUserJoined: "anotherUserJoined",
    userLeft: "userLeft",
  };

  static async userJoining(
    userId: string,
    meetingId: string
  ): Promise<string[]> {
    try {
      const otherUsers: string[] = await this.connection.invoke(
        "userJoining",
        userId,
        meetingId
      );
      console.log("otherUsers>>>>", otherUsers);

      otherUsers.forEach((u) => WebRtc.setNewConnection(u));

      return otherUsers;
    } catch (err) {
      console.error("Failed: User Joined>>>", err);
      return [];
    }
  }

  static unSubscribeFromEvents(): void {
    this.connection.off(this.eventNames.anotherUserJoined);
    this.connection.off(this.eventNames.userLeft);
  }

  static subscribeToEvents({
    onAnotherUserJoined,
    onUserLeft,
  }: MeetingEventsCallbacks): void {
    this.connection.on("anotherUserJoined", (anotherUserId) => {
      console.log("Successfully joined>>>", anotherUserId);
      WebRtc.setNewConnection(anotherUserId);
      onAnotherUserJoined(anotherUserId);
    });

    this.connection.on("userLeft", (userId) => {
      console.log("Successfully left>>>", userId);
      onUserLeft(userId);
    });
  }
}
