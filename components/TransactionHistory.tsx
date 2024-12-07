"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { filterTransactions } from "../actions/actions";

interface Transaction {
  account_id: string;
  created_at: string;
  old_balance: number | null;
  new_balance: number;
  accounts: {
    institution: string;
    routing: string;
    user_id: string;
  };
}

interface TransactionHistoryProps {
  initialTransactions: Transaction[];
  userId: string;
}

export default function TransactionHistory({
  initialTransactions,
  userId,
}: TransactionHistoryProps) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [institution, setInstitution] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  // Get unique institutions for filter dropdown
  const institutions = [
    ...new Set(transactions.map((t) => t.accounts.institution)),
  ];

  const handleFilter = async () => {
    const result = await filterTransactions(
      userId,
      institution === "all" ? "" : institution,
      dateRange === "all" ? "" : dateRange
    );
    if (result.data) {
      setTransactions(result.data as Transaction[]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <div className="flex gap-4 mt-4">
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
          <Button onClick={handleFilter}>Apply Filters</Button>
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
              const change = transaction.old_balance
                ? transaction.new_balance - transaction.old_balance
                : null;
              const changeColor =
                change && change > 0 ? "text-green-600" : "text-red-600";

              return (
                <TableRow key={`${transaction.account_id}-${index}`}>
                  <TableCell>
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.accounts.institution}</TableCell>
                  <TableCell>{transaction.accounts.routing}</TableCell>
                  <TableCell>
                    {transaction.old_balance
                      ? `$${transaction.old_balance.toFixed(2)}`
                      : "Initial Balance"}
                  </TableCell>
                  <TableCell>${transaction.new_balance.toFixed(2)}</TableCell>
                  <TableCell className={change ? changeColor : ""}>
                    {change
                      ? `${change > 0 ? "+" : ""}$${Math.abs(change).toFixed(
                          2
                        )}`
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
