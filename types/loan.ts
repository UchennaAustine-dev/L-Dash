export interface LoanType {
  id: string;
  name: string;
  category: "small_business" | "market_women" | "salary_earners" | "students";
  minAmount: number;
  maxAmount: number;
  termLimitDays: number;
  processingFeeRate: number; // percentage
  penaltyFeeRate: number; // percentage per day
  description: string;
}

export interface CreditOfficer {
  id: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  employeeId: string;
}

export interface Loan {
  id: string;
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
    | "under_repayment"
    | "overdue"
    | "fully_paid";
  customer: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  loanType: LoanType;
  createdBy: CreditOfficer;
  branch: string;
  purposeOfLoan: string;
  notes?: string;
  documents: LoanDocument[];
  fullyPaid: boolean;
}

export interface LoanDocument {
  id: string;
  type: string;
  fileName: string;
  status: "pending" | "approved" | "rejected";
  description: string;
  uploadedAt: string;
}

export interface PaymentAction {
  id: string;
  loanId: string;
  amount: number;
  type: "due_today" | "custom_amount";
  paymentDate: string;
  processedBy: CreditOfficer;
}
