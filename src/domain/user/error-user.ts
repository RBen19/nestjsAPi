
export class UserError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'UserError';
    }
  }
  
  export class UsernameAlreadyTakenError extends UserError {
    constructor(username: string) {
      super(`Username "${username}" est déjà pris`);
      this.name = 'UsernameAlreadyTakenError';
    }
  }
  