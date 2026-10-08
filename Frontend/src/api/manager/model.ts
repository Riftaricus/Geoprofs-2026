import { User } from "../user/model.ts"
import type { UserData } from "../user/model.ts";

export class Manager extends User {
  present_team: User[] | null = null;

  constructor(user: UserData) {
    super({ ...user });
    this.present_team = null; //kan later ingevuld worden, als de data bekend is
  }
}