export default class Auth {
  private static userId: string = "";

  static getUserId(): string {
    return this.userId;
  }

  static setUserId(userId: string): void {
    this.userId = userId;
  }

  static promptForUserId(): void {
    if (this.getUserId()) return;

    const userId = window.prompt("Enter your userId")!;
    this.setUserId(userId);
  }
}
