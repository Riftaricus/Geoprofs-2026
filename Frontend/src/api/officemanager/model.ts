import { User } from "../user/model.ts"

export class OfficeManager extends User {
  constructor(user: User) {
    super({ ...user });
  }
}