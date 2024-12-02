"use client"

import React from 'react'
import AnimatedCounter from './AnimatedCounter'
import { ArrowDown, ArrowUp } from 'lucide-react'

export default function TotalBalance({ totalBalance, cashflow }: { totalBalance: number, cashflow: number }) {
  return (
    <div className="flex flex-col h-full min-h-[180px] rounded-xl bg-muted/50 px-6 py-5 sm:py-6 shadow outline outline-muted/70">
    <h1 className="text-black/80 leading-none tracking-tight">
      Total balance
    </h1>
    <AnimatedCounter balance={totalBalance} />
    <h2 className="text-sm text-muted-foreground mt-auto">
      vs{" "}
      <span className="text-black/80">
        ${parseFloat((totalBalance + Math.abs(cashflow)).toFixed(2))}
      </span>{" "}
      last month{" "}
      {cashflow >= 0 ? (
        <ArrowUp size={10} className="inline-block text-green-500" />
      ) : (
        <ArrowDown size={10} className="inline-block text-red-500" />
      )}
    </h2>
  </div>
  )
}
