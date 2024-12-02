"use client";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import CountUp from "react-countup";

export default function AnimatedCounter({
  balance,
  thisMonth,
  showTrendIcon
}: {
  balance: number;
  thisMonth?: boolean;
  showTrendIcon?: boolean;
}) {
  return balance >= 0 ? (
    <div className="mt-4 text-2xl lg:text-3xl xl:text-4xl">
      {showTrendIcon && <TrendingUp size={24} className="inline-block text-green-500"/>} $
      <CountUp end={balance} duration={1.5} decimals={2} />
    </div>
  ) : (
    <div className="mt-4 text-2xl lg:text-3xl xl:text-4xl">
      {showTrendIcon && <TrendingDown size={24} className="inline-block text-red-500"/>} $
      <CountUp end={Math.abs(balance)} duration={1.5} decimals={2} />{" "}
      {thisMonth && (
        <span className="text-sm text-muted-foreground">this month</span>
      )}
    </div>
  );
}
