export type LeaveFormValues = {
  leaveType: string;
  startDate: string;
  endDate: string;
  comment: string;
};

//verlofsaldo in dagen
export type LeaveSummary = {
  totalBalance: number;
  usedBalance: number;
  remaining: number;
  reserved: number;
  available: number;
};

//moet overeenkomen met LEAVE_TYPES in de backend
export const LEAVE_TYPES = [
  "Vakantie",
  "Persoonlijk verlof",
  "Bijzonder verlof",
  "Studieverlof",
];

//Leave.comment is in de backend maximaal 100 tekens
export const MAX_COMMENT_LENGTH = 100;

//moet overeenkomen met MAX_FILES, MAX_FILE_SIZE en CONTENT_TYPES in de backend
export const ATTACHMENT_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];
export const MAX_ATTACHMENTS = 3;
export const MAX_ATTACHMENT_MB = 10;
