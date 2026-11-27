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
import { Label } from "@/components/ui/label";
import { Account } from "@/types";
import { useDemo } from "@/components/DemoProvider";

export default function TransferMoneyDialog({ fromAccount }: { fromAccount: Account }) {
  const { accounts, peers, transfer } = useDemo();
  const [open, setOpen] = useState(false);
  const [toRoutingNumber, setToRoutingNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const suggestions = [
    ...accounts
      .filter((a) => a.id !== fromAccount.id)
      .map((a) => ({ label: `Your ${a.institution} ${a.type}`, routing: a.routing })),
    ...peers.map((p) => ({ label: `@${p.username}`, routing: p.accounts[0].routing })),
  ];

  const handleOpenChange = (o: boolean) => {
    setOpen(o);
    if (!o) {
      setError(null);
      setToRoutingNumber("");
      setAmount("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = transfer(fromAccount.id, toRoutingNumber, parseFloat(amount));
    if (result.error) {
      setError(result.error);
      return;
    }
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" className="mt-auto">
          Transfer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Money</DialogTitle>
          <DialogDescription>
            Transfer money from {fromAccount.institution} {fromAccount.type} account
            (available: ${fromAccount.balance.toFixed(2)})
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col min-w-64 max-w-64 mx-auto space-y-4">
          <div>
            <Label htmlFor="to_routing_number">Recipient Routing Number</Label>
            <Input
              id="to_routing_number"
              placeholder="Enter recipient routing number"
              value={toRoutingNumber}
              onChange={(e) => setToRoutingNumber(e.target.value)}
              required
            />
            <div className="mt-2 flex flex-wrap gap-1">
              {suggestions.map((s) => (
                <button
                  key={s.routing}
                  type="button"
                  onClick={() => setToRoutingNumber(s.routing)}
                  className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter transfer amount"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <DialogFooter>
            <Button type="submit">Transfer Funds</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
