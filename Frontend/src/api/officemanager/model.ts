import { User } from "../user/model.ts"
import type { UserData } from "../user/model.ts";

export class OfficeManager extends User {
  constructor(user: UserData) {
    super({ ...user });
  }
}