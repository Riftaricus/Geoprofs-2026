//wat de backend verwacht bij POST /leaves/
export type LeaveCreatePayload = {
  leave_type: string;
  start_date: string;
  end_date: string;
  comment: string;
  attachments: File[];
};

//wat de backend teruggeeft voor een verlofaanvraag
export type LeaveApiItem = {
  id: number;
  leave_type: string;
  start_date: string;
  end_date: string;
  comment: string | null;
  status: "pending" | "accepted" | "denied";
  workdays: number;
  attachment_files: { id: number; name: string; size: number }[];
};

//wat de backend teruggeeft bij GET /leave_balances/summary/ (alles in dagen)
export type LeaveSummaryApi = {
  total_balance: number;
  used_balance: number;
  remaining: number;
  reserved: number;
  available: number;
};
