import Auth from "../../auth/auth";
import VideoState from "../../utils/common/video-states";
import WebRtcHelper from "./web-rtc-helper";

export default class MediaRtcHelper extends WebRtcHelper {
  private static audioEnabled: boolean;
  private static videoState: VideoState;
  private static mediaStreamTrack: MediaStreamTrack;

  static toggleAudio(enable: boolean) {
    this.audioEnabled = enable;
  }

  static isAudioEnabled() {
    return this.audioEnabled;
  }

  static async processVideo(newVideoState: VideoState) {
    let mediaStream: MediaStream | null = null;

    try {
      if (newVideoState === VideoState.Camera) {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 1920,
            height: 1080,
          },
          audio: false,
        });
      } else if (newVideoState === VideoState.ScreenShare) {
        mediaStream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            width: 1920,
            height: 1080,
          },
          audio: false,
        });
      }

      this.videoState = newVideoState;

      if (mediaStream && mediaStream.getVideoTracks().length) {
        this.mediaStreamTrack = mediaStream.getVideoTracks()[0];
        if (this.mediaStreamTrack) {
          const myVideoHtml = document.getElementById(
            `video_${Auth.getUserId()}`
          ) as HTMLVideoElement;
          myVideoHtml.srcObject = new MediaStream([this.mediaStreamTrack]);
          this.updateMediaSenders();
        }
      }
    } catch (err) {
      console.error("Failed to get media in processVideoState", err);
    }
  }

  static updateMediaSenders() {
    console.log(`Called updateMediaSenders>>>>`);

    if (this.videoState !== VideoState.None && this.mediaStreamTrack) {
      this.peersConnections.forEach((connection, userId) => {
        console.log(`Checking rtc status for user: ${userId}`);

        if (this.connectionStatus(connection)) {
          console.log(
            `Checked rtc status for user: ${userId}, status: ${connection.connectionState}`
          );

          const rtpSender = this.rtpSenders.get(userId);

          console.log(`Rtp Sender for user: ${userId}, rtp: `, rtpSender);

          if (rtpSender && rtpSender.track) {
            console.log(`Rtp replacing track for user: ${userId}`);
            rtpSender.replaceTrack(this.mediaStreamTrack);
          } else {
            console.log(`Rtp adding track for user: ${userId}`);
            this.rtpSenders.set(
              userId,
              connection.addTrack(this.mediaStreamTrack)
            );
          }
        }
      });
    }
  }
}
