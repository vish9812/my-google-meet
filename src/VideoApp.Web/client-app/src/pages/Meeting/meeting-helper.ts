import SignalRHelper from "../../infrastructure/signalr-helper";
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

  static unSubscribeFromEvents(): void {
    this.connection.off(this.eventNames.anotherUserJoined);
    this.connection.off(this.eventNames.userLeft);
  }

  static subscribeToEvents({
    onAnotherUserJoined,
    onUserLeft,
  }: MeetingEventsCallbacks): void {
    this.connection.on("anotherUserJoined", (userId, testData) => {
      console.log("Successfully joined>>>", userId);
      console.log("Successfully joined TestData>>>", testData);
      onAnotherUserJoined(userId);
    });

    this.connection.on("userLeft", (userId) => {
      console.log("Successfully left>>>", userId);
      onUserLeft(userId);
    });
  }
}
