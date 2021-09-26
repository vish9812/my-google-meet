import Auth from "../../auth/auth";
import VideoState from "../../utils/common/video-states";
import UIHelper from "../../utils/ui-helper";
import WebRtcHelper from "./web-rtc-helper";

export default class MediaRtcHelper extends WebRtcHelper {
  private static videoState: VideoState;
  private static videoStreamTrack: MediaStreamTrack | null;
  private static rtpVideoSenders = new Map<string, RTCRtpSender>();
  private static audioStreamTrack: MediaStreamTrack | null;
  private static rtpAudioSenders = new Map<string, RTCRtpSender>();

  static async processAudio(isMuted: boolean) {
    if (isMuted) {
      this.removeMediaSenders(this.rtpAudioSenders);
    } else {
      if (!this.audioStreamTrack) {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });

        if (audioStream && audioStream.getAudioTracks().length) {
          this.audioStreamTrack = audioStream.getAudioTracks()[0];
        }
      }

      this.updateMediaSenders(true);
    }
  }

  static async processVideo(newVideoState: VideoState) {
    this.videoState = newVideoState;

    let videoStream: MediaStream | null = null;

    try {
      if (newVideoState === VideoState.Camera) {
        videoStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 1920,
            height: 1080,
          },
          audio: false,
        });
      } else if (newVideoState === VideoState.ScreenShare) {
        videoStream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            width: 1920,
            height: 1080,
          },
          audio: false,
        });
      } else {
        this.removeVideoStream();
      }

      if (videoStream && videoStream.getVideoTracks().length) {
        this.videoStreamTrack = videoStream.getVideoTracks()[0];
        if (this.videoStreamTrack) {
          UIHelper.setVideoSrc(
            Auth.getUserId(),
            new MediaStream([this.videoStreamTrack])
          );
          this.updateMediaSenders(false);
        }
      }
    } catch (err) {
      console.error("Failed to get media in processVideoState", err);
    }
  }

  static updateMediaSenders(isAudio: boolean) {
    console.log(`Called updateMediaSenders with isAudio`, isAudio);

    let mediaStreamTrack: MediaStreamTrack | null = null;
    let rtpSenders: Map<string, RTCRtpSender> = new Map<string, RTCRtpSender>();

    if (isAudio) {
      mediaStreamTrack = this.audioStreamTrack;
      rtpSenders = this.rtpAudioSenders;
    } else if (this.videoState !== VideoState.None && this.videoStreamTrack) {
      mediaStreamTrack = this.videoStreamTrack;
      rtpSenders = this.rtpVideoSenders;
    }

    if (mediaStreamTrack) {
      this.peersConnections.forEach((connection, userId) => {
        console.log(`Checking rtc status for user: ${userId}`);

        if (this.connectionStatus(connection)) {
          console.log(
            `Checked rtc status for user: ${userId}, status: ${connection.connectionState}`
          );

          const rtpSender = rtpSenders.get(userId);

          console.log(`Rtp Sender for user: ${userId}, rtp: `, rtpSender);

          if (rtpSender && rtpSender.track) {
            console.log(`Rtp replacing track for user: ${userId}`);
            rtpSender.replaceTrack(mediaStreamTrack);
          } else {
            console.log(`Rtp adding track for user: ${userId}`);
            rtpSenders.set(userId, connection.addTrack(mediaStreamTrack!));
          }
        }
      });
    }
  }

  private static removeVideoStream() {
    if (this.videoStreamTrack) {
      this.videoStreamTrack.stop();
      this.videoStreamTrack = null;

      UIHelper.setVideoSrc(Auth.getUserId(), null);

      this.removeMediaSenders(this.rtpVideoSenders);
    }
  }

  private static removeMediaSenders(rtpSenders: Map<string, RTCRtpSender>) {
    this.peersConnections.forEach((connection, userId) => {
      const rtpSender = rtpSenders.get(userId);
      if (rtpSender && this.connectionStatus(connection)) {
        connection.removeTrack(rtpSender);
        rtpSenders.delete(userId);
      }
    });
  }
}
