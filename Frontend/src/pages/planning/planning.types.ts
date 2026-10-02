export type PlanningView = "day" | "week" | "month";

export type PlanningItemType = "work" | "leave";

export type LeaveStatus = "pending" | "accepted" | "denied";

//PlanningItem - moet nog in de ERD
export type PlanningItem = {
  id: number;
  userId: number;
  date: string;
  title: string;
  projectId?: number;
  projectName?: string;
  description?: string;
  type: PlanningItemType;
  leaveStatus?: LeaveStatus;
};

//Leave - ERD
export type LeaveRequest = {
  userId: number;
  startDate: string;
  endDate: string;
  reason: string;
  comment: string;
};

//LeaveBalance - Staat in het ERD gebruik ik verder niet. Bij verlofaanvraag komt dit te pas.
export type LeaveBalance = {
  userId: number;
  totalBalance: number;
  usedBalance: number;
};

export type PlanningDetailsProps = {
  selectedDate: string;
  items: PlanningItem[];
  onRequestLeave: () => void;
};
