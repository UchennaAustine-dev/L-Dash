"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Repayment } from "@/types/repayment";

interface PaymentModalProps {
  repayment: Repayment | null;
  isOpen: boolean;
  onClose: () => void;
  onMakePayment: (repaymentId: number, amount: number) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  repayment,
  isOpen,
  onClose,
  onMakePayment,
}) => {
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleDueTodayPayment = () => {
    if (repayment) {
      onMakePayment(repayment.id, repayment.dueToday);
      onClose();
    }
  };

  const handleCustomPayment = () => {
    if (repayment && customAmount) {
      const amount = Number.parseFloat(customAmount);
      if (amount > 0 && amount <= repayment.amountLeftToPay) {
        onMakePayment(repayment.id, amount);
        setCustomAmount("");
        onClose();
      }
    }
  };

  const formatCurrency = (amount: number): string => {
    return `₦${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (!repayment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Make Payment - {repayment.loanNumber}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount Left to Pay:</span>
              <span className="font-semibold">
                {formatCurrency(repayment.amountLeftToPay)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Due Today:</span>
              <span className="font-semibold text-orange-600">
                {formatCurrency(repayment.dueToday)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleDueTodayPayment}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={repayment.dueToday <= 0}
            >
              Pay Due Today ({formatCurrency(repayment.dueToday)})
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customAmount">Custom Amount (₦)</Label>
              <Input
                id="customAmount"
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCustomAmount(e.target.value)
                }
                max={repayment.amountLeftToPay}
              />
            </div>

            <Button
              onClick={handleCustomPayment}
              variant="outline"
              className="w-full bg-transparent"
              disabled={!customAmount || Number.parseFloat(customAmount) <= 0}
            >
              Pay Custom Amount
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
