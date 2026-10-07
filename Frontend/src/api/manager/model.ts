import { User } from "../user/model.ts"

export class Manager extends User {
  present_team: User[] | null = null;

  constructor(user: User) {
    super({ ...user });
    this.present_team = null;
  }
}