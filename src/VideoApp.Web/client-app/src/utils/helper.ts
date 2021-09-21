class Helper {
  static getRandomDigits(digitsLength: number = 8): string {
    return ("" + Math.random()).substring(2, 2 + digitsLength);
  }
}

export default Helper;
