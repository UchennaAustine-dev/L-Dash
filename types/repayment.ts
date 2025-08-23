export interface Repayment {
  id: number;
  loan: string;
  paymentDate: string;
  principalAmount: number;
  interest: number;
  penalty: number;
  totalAmount: number;
}

export interface RepaymentFormData {
  loan: string;
  paymentDate: string;
  principalAmount: string;
  interest: string;
  penalty: string;
  totalAmount: string;
}
