"use client";
import React from "react";
import CountUp from "react-countup";

export default function AnimatedCounter({ balance }: { balance: number }) {
  return (
    <div className="mt-4 text-2xl lg:text-4xl xl:text-5xl">
      $<CountUp end={balance} duration={2.5} decimals={2} />
    </div>
  );
}
