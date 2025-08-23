"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Repayment, RepaymentFormData } from "@/types/repayment";

interface EditRepaymentModalProps {
  loans: string[];
  repayment: Repayment | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateRepayment: (updatedRepayment: Repayment) => void;
}

export const EditRepaymentModal: React.FC<EditRepaymentModalProps> = ({
  loans,
  repayment,
  isOpen,
  onClose,
  onUpdateRepayment,
}) => {
  const [formData, setFormData] = useState<RepaymentFormData>({
    loan: "",
    paymentDate: "",
    principalAmount: "",
    interest: "",
    penalty: "",
    totalAmount: "",
  });

  // Set form data when repayment changes
  useEffect(() => {
    if (repayment) {
      setFormData({
        loan: repayment.loan,
        paymentDate: repayment.paymentDate,
        principalAmount: repayment.principalAmount.toString(),
        interest: repayment.interest.toString(),
        penalty: repayment.penalty.toString(),
        totalAmount: repayment.totalAmount.toString(),
      });
    }
  }, [repayment]);

  // Calculate total amount when other fields change
  useEffect(() => {
    const principal = parseFloat(formData.principalAmount) || 0;
    const interest = parseFloat(formData.interest) || 0;
    const penalty = parseFloat(formData.penalty) || 0;
    const total = principal + interest + penalty;

    if (total > 0) {
      setFormData((prev) => ({ ...prev, totalAmount: total.toFixed(2) }));
    }
  }, [formData.principalAmount, formData.interest, formData.penalty]);

  const handleUpdate = (): void => {
    if (
      !repayment ||
      !formData.loan ||
      !formData.paymentDate ||
      !formData.principalAmount
    )
      return;

    const updatedRepayment: Repayment = {
      ...repayment,
      loan: formData.loan,
      paymentDate: formData.paymentDate,
      principalAmount: parseFloat(formData.principalAmount),
      interest: parseFloat(formData.interest) || 0,
      penalty: parseFloat(formData.penalty) || 0,
      totalAmount: parseFloat(formData.totalAmount),
    };

    onUpdateRepayment(updatedRepayment);
    onClose();
  };

  if (!repayment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit repayment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-loan">Loan</Label>
            <Select
              value={formData.loan}
              onValueChange={(value: string) =>
                setFormData((prev) => ({ ...prev, loan: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {loans.map((loan) => (
                  <SelectItem key={loan} value={loan}>
                    {loan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-paymentDate">Payment Date</Label>
            <Input
              id="edit-paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  paymentDate: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-principalAmount">Principal Amount</Label>
            <Input
              id="edit-principalAmount"
              type="number"
              value={formData.principalAmount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  principalAmount: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-interest">Interest</Label>
            <Input
              id="edit-interest"
              type="number"
              value={formData.interest}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, interest: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-penalty">Penalty</Label>
            <Input
              id="edit-penalty"
              type="number"
              value={formData.penalty}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, penalty: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-totalAmount">Total Amount</Label>
            <Input
              id="edit-totalAmount"
              type="number"
              value={formData.totalAmount}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleUpdate}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
