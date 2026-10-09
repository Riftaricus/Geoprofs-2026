interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile_photo: string | null;
  leave_saldo: number;
}

interface Employee extends UserData {
  role:"employee"
}

interface Manager extends UserData {
  role:"manager"
}

interface OfficeManager extends UserData {
  role:"office_manager"
}

export type User = Employee | Manager | OfficeManager;