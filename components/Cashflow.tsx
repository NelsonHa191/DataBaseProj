"use client"

import React from 'react'
import AnimatedCounter from './AnimatedCounter'
import { ArrowDown, ArrowUp } from 'lucide-react'

export default function Cashflow({ totalMoneyIn, totalMoneyOut, cashflow }: { totalMoneyIn: number, totalMoneyOut: number, cashflow: number }) {
  return (
    <div className="flex flex-col h-full min-h-[180px] rounded-xl bg-muted/50 px-6 py-5 sm:py-6 shadow outline outline-muted/70">
            <h1 className="text-black/80 leading-none tracking-tight">
              Cashflow
            </h1>
            <AnimatedCounter
              balance={cashflow}
              thisMonth={true}
              showTrendIcon={true}
            />
            <div className="flex flex-row mt-auto text-sm">
              <p className="">
                ${totalMoneyIn}{" "}
                <span className="text-green-500">
                  in <ArrowUp size={10} className="inline-block" />
                </span>
              </p>
              <p className="ml-auto">
                ${totalMoneyOut}{" "}
                <span className="text-red-500">
                  out <ArrowDown size={10} className="inline-block" />
                </span>
              </p>
            </div>
          </div>
  )
}
