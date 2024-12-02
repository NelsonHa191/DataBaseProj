"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Account, chartDataProps } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getAccountChartAction } from "@/actions/actions";
import { useEffect } from "react";

const chartConfig = {
  desktop: {
    label: "balance",
    color: "Blue",
  },
} satisfies ChartConfig;

export function BalanceActivityChart({ accounts }: { accounts: Account[] }) {
  const [timeRange, setTimeRange] = React.useState("90d")
  const [currentChart, setCurrentChart] = React.useState(accounts[0].id);
  const [chartData, setChartData] = React.useState<chartDataProps[]>([]);
  useEffect(() => {
    getAccountChartAction(currentChart).then(setChartData);
  }, [currentChart]);

  // const chartData = [
  //   {date: "2024-01-01", balance: 121},
  //   {date: "2024-02-01", balance: 2424},
  //   {date: "2024-03-01", balance: 3434},
  //   {date: "2024-04-01", balance: 232},
  //   {date: "2024-05-01", balance: 5455},
  //   {date: "2024-06-01", balance: 55},
  // ]

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Balance activity</CardTitle>
          <CardDescription>
            Showing balance activity for the last 3 months
          </CardDescription>
        </div>
        <Select value={currentChart} onValueChange={setCurrentChart}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select an account"
          >
            <SelectValue placeholder="Select account" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {accounts.map((acc: Account) => (
              <SelectItem key={acc.id} value={acc.id} className="rounded-lg">
                {acc.institution} {acc.type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:pr-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={16} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="balance"
              type="linear"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
