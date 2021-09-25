export default interface SdpDataModel {
  offer?: RTCSessionDescription | null;
  answer?: RTCSessionDescriptionInit;
  icecandidate?: RTCIceCandidateInit;
}
