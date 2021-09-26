import UIHelper from "../../utils/ui-helper";
import MediaRtcHelper from "./media-rtc-helper";
import SdpDataModel from "./sdp-data-model";

export type MediaTrackHandler = (userId: string, stream: MediaStream) => void;
export type SendSdpToServerFunc = (
  message: SdpDataModel,
  toUserId: string
) => Promise<void>;

export default class WebRtcHelper {
  private static config: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  protected static peersConnections = new Map<string, RTCPeerConnection>();
  private static remoteVideoStreams = new Map<string, MediaStream>();
  private static remoteAudioStreams = new Map<string, MediaStream>();
  private static sendSdpToServer: SendSdpToServerFunc;

  static setSendSdpToServer(sendSdpToServer: SendSdpToServerFunc) {
    this.sendSdpToServer = sendSdpToServer;
  }

  static async processSdpData(
    sdpData: SdpDataModel,
    fromUserId: string
  ): Promise<void> {
    console.log(
      `processing client sdp-data from ${fromUserId}, with message: `,
      sdpData
    );

    let { offer, answer, icecandidate }: SdpDataModel = sdpData;

    let connection = this.peersConnections.get(fromUserId);
    if (!connection) {
      this.setNewConnection(fromUserId);
      connection = this.peersConnections.get(fromUserId)!;
    }

    if (offer) {
      await connection.setRemoteDescription(new RTCSessionDescription(offer));
      answer = await connection.createAnswer();
      await connection.setLocalDescription(answer);
      this.sendSdpToServer({ answer }, fromUserId);
    } else if (answer) {
      await connection.setRemoteDescription(new RTCSessionDescription(answer));
    } else if (icecandidate) {
      await connection.addIceCandidate(icecandidate);
    }
  }

  static setNewConnection(
    userId: string
    // videoTrackHandler: MediaTrackHandler,
    // audioTrackHandler: MediaTrackHandler
  ): RTCPeerConnection {
    console.log(`Setting new RTC Connection for user: ${userId}`);

    const connection = new RTCPeerConnection(this.config);

    connection.onnegotiationneeded = async () => await this.setOffer(userId);

    connection.onicecandidate = (event) => {
      console.log(`Handing icecandidate for user: ${userId}`);
      if (event.candidate && this.sendSdpToServer) {
        this.sendSdpToServer({ icecandidate: event.candidate }, userId);
      }
    };

    connection.ontrack = (event) =>
      this.onTrackHandler(
        event,
        userId
        // , videoTrackHandler, audioTrackHandler
      );

    this.peersConnections.set(userId, connection);

    MediaRtcHelper.updateMediaSenders(true);
    MediaRtcHelper.updateMediaSenders(false);

    return connection;
  }

  protected static connectionStatus(connection: RTCPeerConnection): boolean {
    return (
      connection &&
      (connection.connectionState === "new" ||
        connection.connectionState === "connecting" ||
        connection.connectionState === "connected")
    );
  }

  private static async setOffer(userId: string): Promise<void> {
    console.log(`Setting offer for user: ${userId}`);
    const connection = this.peersConnections.get(userId)!;
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
    this.sendSdpToServer({ offer: connection.localDescription }, userId);
  }

  private static onTrackHandler(
    event: RTCTrackEvent,
    userId: string
    // videoTrackHandler: MediaTrackHandler,
    // audioTrackHandler: MediaTrackHandler
  ): void {
    console.log(`Handing track for user: ${userId}`);
    let videoStream = this.remoteVideoStreams.get(userId);
    let audioStream = this.remoteAudioStreams.get(userId);

    if (!videoStream) {
      videoStream = new MediaStream();
      this.remoteVideoStreams.set(userId, videoStream);
    }
    if (!audioStream) {
      audioStream = new MediaStream();
      this.remoteAudioStreams.set(userId, audioStream);
    }

    console.log(
      `Got track for user: ${userId}, track kind: ${event.track.kind}`
    );

    if (event.track.kind === "video") {
      videoStream.getVideoTracks().forEach((t) => videoStream!.removeTrack(t));

      videoStream.addTrack(event.track);
      // videoTrackHandler(userId, videoStream);
      UIHelper.setVideoSrc(userId, videoStream);
    } else if (event.track.kind === "audio") {
      audioStream.getAudioTracks().forEach((t) => audioStream!.removeTrack(t));

      audioStream.addTrack(event.track);
      // audioTrackHandler(userId, audioStream);
      UIHelper.setAudioSrc(userId, audioStream);
    }
  }
}
