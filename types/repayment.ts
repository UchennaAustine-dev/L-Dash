export interface Repayment {
  id: number;
  loanNumber: string;
  loanIssuedDate: string;
  loanDeadline: string;
  repaymentDate: string;
  principalAmount: number;
  processingFee: number;
  amountLeftToPay: number;
  totalAmount: number;
  penaltyFee: number;
  dueToday: number;
  status:
    | "processing"
    | "approved"
    | "under repayment"
    | "overdue"
    | "fully paid";
  loanType: "short-term" | "medium-term" | "long-term";
  amountPaidAlready: number;
}

export interface RepaymentFormData {
  loanNumber: string;
  loanIssuedDate: string;
  repaymentDate: string;
  principalAmount: string;
  processingFee: string;
  loanType: "short-term" | "medium-term" | "long-term";
}
