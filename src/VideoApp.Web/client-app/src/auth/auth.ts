import Helper from "../utils/helper";

export default class Auth {
  private static userId: string = "";

  static getUserId(): string {
    return this.userId;
  }

  static setUserId(userId: string): void {
    this.userId = userId || Helper.getRandomDigits(5);
  }

  static promptForUserId(): void {
    if (this.getUserId()) return;

    const userId = window.prompt("Enter your userId")!;
    this.setUserId(userId);
  }
}
