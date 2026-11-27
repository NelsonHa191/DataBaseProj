"use client";

import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types";

export default function TransactionHistory({
  initialTransactions,
}: {
  initialTransactions: Transaction[];
}) {
  const [institution, setInstitution] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [applied, setApplied] = useState({ institution: "all", cutoff: 0 });

  const applyFilters = () =>
    setApplied({
      institution,
      cutoff: dateRange === "all" ? 0 : Date.now() - parseInt(dateRange) * 24 * 60 * 60 * 1000,
    });

  const institutions = [...new Set(initialTransactions.map((t) => t.accounts.institution))];

  const transactions = useMemo(() => {
    return initialTransactions.filter(
      (t) =>
        (applied.institution === "all" || t.accounts.institution === applied.institution) &&
        new Date(t.created_at).getTime() >= applied.cutoff
    );
  }, [initialTransactions, applied]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap gap-4">
          <Select value={institution} onValueChange={setInstitution}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All banks</SelectItem>
              {institutions.map((inst) => (
                <SelectItem key={inst} value={inst}>
                  {inst}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Routing</TableHead>
              <TableHead>Previous Balance</TableHead>
              <TableHead>New Balance</TableHead>
              <TableHead>Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => {
              const change =
                transaction.old_balance !== null
                  ? transaction.new_balance - transaction.old_balance
                  : null;
              const changeColor = change && change > 0 ? "text-green-600" : "text-red-600";

              return (
                <TableRow key={`${transaction.account_id}-${transaction.created_at}-${index}`}>
                  <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.accounts.institution}</TableCell>
                  <TableCell>{transaction.accounts.routing}</TableCell>
                  <TableCell>
                    {transaction.old_balance !== null
                      ? `$${transaction.old_balance.toFixed(2)}`
                      : "Initial Balance"}
                  </TableCell>
                  <TableCell>${transaction.new_balance.toFixed(2)}</TableCell>
                  <TableCell className={change ? changeColor : ""}>
                    {change
                      ? `${change > 0 ? "+" : "-"}$${Math.abs(change).toFixed(2)}`
                      : "N/A"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
