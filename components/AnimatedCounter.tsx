"use client";
import React from "react";
import CountUp from "react-countup";

export default function AnimatedCounter({ balance }: { balance: number }) {
  return (
    <div>
      $<CountUp end={balance} duration={2.5} decimals={2} />
    </div>
  );
}
