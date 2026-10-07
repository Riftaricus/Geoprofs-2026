export class User {
  public first_name: string;
  public last_name: string;
  public email: string;
  public phone_number: string;
  public profile_photo: string | null;
  public leave_saldo: number;

  constructor({ first_name, last_name, email, phone_number, profile_photo, leave_saldo }: User) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone_number = phone_number;
    this.profile_photo = profile_photo;
    this.leave_saldo = leave_saldo;
  }
}
