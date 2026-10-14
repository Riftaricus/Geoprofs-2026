type TeamPresence = {
  label: string;
  value: number;
  color: string;
}

type LeaveType = TeamPresence;

type MessageType = {
  reason_sm: string;
  subject: string;
  status?: string | null;
}

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile_photo: string | null;
  leave: LeaveType[];
  messages: MessageType[];
}

interface Employee extends UserData {
}

interface Manager extends UserData {
  team_presence: TeamPresence[],
}

interface OfficeManager extends UserData {
}

export type User = Employee | Manager | OfficeManager;