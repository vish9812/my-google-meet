export default interface MeetingEventsCallbacks {
  onAnotherUserJoined: (userId: string) => void;
  onUserLeft: (userId: string) => void;
}
