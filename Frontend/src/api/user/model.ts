import { Employee } from "../employee/model";
import { Manager } from "../manager/model";
import { OfficeManager } from "../officemanager/model";

export type RoleType = Manager | OfficeManager | Employee;

export type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile_photo: string | null;
  leave_saldo: number;
}

export abstract class User {
  constructor({ first_name, last_name, email, phone_number, profile_photo, leave_saldo }: UserData) {
    first_name = first_name;
    last_name = last_name;
    email = email;
    phone_number = phone_number;
    profile_photo = profile_photo;
    leave_saldo = leave_saldo;
  }

  // login word hierdoor:
  // const user:User = new User.getConcreteUserClass(userData, "Manager")
  // const user word dan een Manager, OfficeManager of Worker class
  // die goed aansluit op hoe het dashboard switcht op basis van rol

  public static getConcreteUserClass(data: UserData, type: RoleType): User {
    switch (type) {
      case "manager":
        return new Manager(data);

      case "office manager":
        return new OfficeManager(data);

      case "worker":
        return new Employee(data);

      default:
        return new Employee(data);
    }
  }
}
