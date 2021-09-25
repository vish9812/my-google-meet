import SdpDataModel from "../../infrastructure/sdp-data-model";
import SignalRHelper from "../../infrastructure/signalr-helper";
import WebRtc from "../../infrastructure/web-rtc-helper";

export default class VideoHelper extends SignalRHelper {
  private static eventNames = {
    sdpProcess: "sdpProcess",
  };

  static init(): void {
    WebRtc.sendSdpToServer = async (
      message: SdpDataModel,
      toUserId: string
    ): Promise<void> => {
      try {
        await this.connection.invoke(
          this.eventNames.sdpProcess,
          toUserId,
          message
        );
      } catch (err) {
        console.error("Failed: process SDP>>>", err);
      }
    };
  }

  static unSubscribeFromEvents(): void {
    this.connection.off(this.eventNames.sdpProcess);
  }

  static subscribeToEvents(): void {
    this.connection.on(this.eventNames.sdpProcess, (fromUserId, sdpData) => {
      console.log(
        `got sdpProcess from: ${fromUserId}, with message: `,
        sdpData
      );

      WebRtc.processSdpData(sdpData, fromUserId);
    });
  }
}
