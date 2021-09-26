import SignalRHelper from "../../infrastructure/signalr/signalr-helper";
import MeetingEventsCallbacks from "../../pages/meeting/models/meeting-events-callbacks";
import WebRtcHelper from "../web-rtc/web-rtc-helper";

export default class MeetingSignalR extends SignalRHelper {
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

      otherUsers.forEach((u) => WebRtcHelper.setNewConnection(u));

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
      WebRtcHelper.setNewConnection(anotherUserId);
      onAnotherUserJoined(anotherUserId);
    });

    this.connection.on("userLeft", (userId) => {
      console.log("Successfully left>>>", userId);
      onUserLeft(userId);
    });
  }
}
