import SdpDataModel from "./sdp-data-model";

export type MediaTrackHandler = (userId: string, stream: MediaStream) => void;

export default class WebRtc {
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

  private static peers = new Set<string>();
  private static peersConnections = new Map<string, RTCPeerConnection>();
  private static remoteVideoStreams = new Map<string, MediaStream>();
  private static remoteAudioStreams = new Map<string, MediaStream>();

  static sendSdpToServer: (
    message: SdpDataModel,
    toUserId: string
  ) => Promise<void>;

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
    const connection = new RTCPeerConnection(this.config);

    connection.onnegotiationneeded = async (event) =>
      await this.setOffer(userId);

    connection.onicecandidate = (event) => {
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

    this.peers.add(userId);
    this.peersConnections.set(userId, connection);

    return connection;
  }

  private static async setOffer(userId: string): Promise<void> {
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

    if (event.track.kind === "video") {
      videoStream.getVideoTracks().forEach((t) => videoStream!.removeTrack(t));

      videoStream.addTrack(event.track);
      // videoTrackHandler(userId, videoStream);
      const videoHtml = document.getElementById(
        `video_${userId}`
      ) as HTMLVideoElement;
      videoHtml.srcObject = videoStream;
      videoHtml.load();
    } else if (event.track.kind === "audio") {
      audioStream.getAudioTracks().forEach((t) => audioStream!.removeTrack(t));

      audioStream.addTrack(event.track);
      // audioTrackHandler(userId, audioStream);
      const audioHtml = document.getElementById(
        `audio_${userId}`
      ) as HTMLAudioElement;
      audioHtml.srcObject = audioStream;
      audioHtml.load();
    }
  }
}
