export default class UIHelper {
  static setVideoSrc(userId: string, src: MediaStream | null) {
    const media = document.getElementById(
      `video_${userId}`
    ) as HTMLVideoElement;
    media.srcObject = src;
  }

  static setAudioSrc(userId: string, src: MediaStream | null) {
    const media = document.getElementById(
      `audio_${userId}`
    ) as HTMLAudioElement;
    media.srcObject = src;
  }
}
