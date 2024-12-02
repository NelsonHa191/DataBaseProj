"use client";
import React from "react";
import CountUp from "react-countup";

export default function AnimatedCounter({ balance }: { balance: number }) {
  return balance > 0 ? (
    <div className="mt-4 text-2xl lg:text-3xl xl:text-4xl">
      $<CountUp end={balance} duration={1.5} decimals={2} />
    </div>
  ) : (
    <div className="mt-4 text-2xl lg:text-3xl xl:text-4xl">
      -$<CountUp end={Math.abs(balance)} duration={1.5} decimals={2} />
    </div>
  );
}
