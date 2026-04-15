const emailRegex: RegExp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

class Validate {
  private emailRegex: RegExp;

  constructor() {
    this.emailRegex = emailRegex;
  }

  isEmpty(...data: unknown[]): boolean {
    return data.some((item) => !item);
  }

  isEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }
}

const validate = new Validate();

export default validate;
