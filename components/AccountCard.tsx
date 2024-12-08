"use client"

import { Account } from "@/types";
import React from "react";

export default function AccountCard({ acc, carouselCard = false }: {acc: Account, carouselCard?: boolean}) {
  return (
    <div
      key={acc.id}
      className={carouselCard ? `flex flex-col min-h-[300px] rounded-xl bg-transparent px-6 py-5 sm:py-6 text-black/80` : `flex flex-col min-h-[300px] rounded-xl bg-muted/100 px-6 py-5 sm:py-6 shadow outline outline-muted/70 text-black/80`}
    >
      <h1 className="tracking-tight text-xl">{acc.institution}</h1>
      <p>{acc.type}</p>
      <p>{acc.routing}</p>
      <div className="mt-auto flex flex-row items-center">
        <p className="text-2xl xl:text-4xl">
          ${acc.balance.toFixed(2)}{" "}
          <span className="text-sm text-muted-foreground">balance</span>
        </p>
        <p className="ml-auto">ID: {acc.id}</p>
      </div>
    </div>
  );
}
