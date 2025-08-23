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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Repayment, RepaymentFormData } from "@/types/repayment";

interface CreateRepaymentModalProps {
  loans: string[];
  onCreateRepayment: (repayment: Omit<Repayment, "id">) => void;
}

export const CreateRepaymentModal: React.FC<CreateRepaymentModalProps> = ({
  loans,
  onCreateRepayment,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<RepaymentFormData>({
    loan: "",
    paymentDate: "",
    principalAmount: "",
    interest: "",
    penalty: "",
    totalAmount: "",
  });

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

  const resetForm = (): void => {
    setFormData({
      loan: "",
      paymentDate: "",
      principalAmount: "",
      interest: "",
      penalty: "",
      totalAmount: "",
    });
  };

  const handleCreate = (): void => {
    if (!formData.loan || !formData.paymentDate || !formData.principalAmount)
      return;

    const newRepayment: Omit<Repayment, "id"> = {
      loan: formData.loan,
      paymentDate: formData.paymentDate,
      principalAmount: parseFloat(formData.principalAmount),
      interest: parseFloat(formData.interest) || 0,
      penalty: parseFloat(formData.penalty) || 0,
      totalAmount: parseFloat(formData.totalAmount),
    };

    onCreateRepayment(newRepayment);
    setIsOpen(false);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Repayment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Repayment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="loan">Loan</Label>
            <Select
              value={formData.loan}
              onValueChange={(value: string) =>
                setFormData((prev) => ({ ...prev, loan: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Loan" />
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
            <Label htmlFor="paymentDate">Payment Date</Label>
            <Input
              id="paymentDate"
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
            <Label htmlFor="principalAmount">Principal Amount</Label>
            <Input
              id="principalAmount"
              type="number"
              placeholder="Enter principal amount"
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
            <Label htmlFor="interest">Interest</Label>
            <Input
              id="interest"
              type="number"
              placeholder="Enter interest"
              value={formData.interest}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, interest: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="penalty">Penalty</Label>
            <Input
              id="penalty"
              type="number"
              placeholder="Enter penalty"
              value={formData.penalty}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, penalty: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalAmount">Total Amount</Label>
            <Input
              id="totalAmount"
              type="number"
              placeholder="Enter total amount"
              value={formData.totalAmount}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleCreate}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
