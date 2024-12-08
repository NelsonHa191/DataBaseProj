// components/TransferMoneyDialog.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { transferMoneyAction } from "../actions/actions";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { Account } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransferMoneyDialogProps {
  fromAccount: Account;
  accounts: Account[];
}

export default function TransferMoneyDialog({
  fromAccount,
  accounts,
}: TransferMoneyDialogProps) {
  const [toRoutingNumber, setToRoutingNumber] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="mt-auto">
          Transfer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Money</DialogTitle>
          <DialogDescription>
            Transfer money from {fromAccount.institution} {fromAccount.type}{" "}
            account
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col min-w-64 max-w-64 mx-auto space-y-4">
          <input type="hidden" name="from_account_id" value={fromAccount.id} />

          <div>
            <Label htmlFor="to_routing_number">Recipient Routing Number</Label>
            <Input
              name="to_routing_number"
              placeholder="Enter recipient routing number"
              value={toRoutingNumber}
              onChange={(e) => setToRoutingNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              name="amount"
              type="number"
              placeholder="Enter transfer amount"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <DialogFooter>
            <SubmitButton
              formAction={transferMoneyAction}
              pendingText="Transferring..."
            >
              Transfer Funds
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
