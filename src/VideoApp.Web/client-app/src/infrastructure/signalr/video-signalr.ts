import SdpDataModel from "../web-rtc/sdp-data-model";
import SignalRHelper from "./signalr-helper";
import WebRtcHelper from "../web-rtc/web-rtc-helper";

export default class VideoSignalR extends SignalRHelper {
  private static eventNames = {
    sdpProcess: "sdpProcess",
  };

  static init(): void {
    WebRtcHelper.setSendSdpToServer(
      async (message: SdpDataModel, toUserId: string): Promise<void> => {
        console.log(
          `Sending sdp to user: ${toUserId}, with message: `,
          message
        );
        try {
          await this.connection.invoke(
            this.eventNames.sdpProcess,
            toUserId,
            message
          );
        } catch (err) {
          console.error("Failed: process SDP>>>", err);
        }
      }
    );
  }

  static unSubscribeFromEvents(): void {
    this.connection.off(this.eventNames.sdpProcess);
  }

  static subscribeToEvents(): void {
    this.connection.on(
      this.eventNames.sdpProcess,
      async (fromUserId, sdpData) => {
        console.log(
          `got sdpProcess from: ${fromUserId}, with message: `,
          sdpData
        );

        await WebRtcHelper.processSdpData(sdpData, fromUserId);
      }
    );
  }
}
