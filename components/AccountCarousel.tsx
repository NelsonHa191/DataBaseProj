"use client";

import { Account } from "@/types";
import React from "react";
import AccountCard from "./AccountCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

export default function AccountCarousel({ accounts }: { accounts: Account[] }) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-muted/100 via-indigo-100 to-muted rounded-xl shadow outline outline-muted/70">
      <Carousel className="w-full">
        <CarouselContent>
          {accounts.map((acc: Account) => (
            <CarouselItem key={acc.id}>
              <AccountCard acc={acc} carouselCard={true} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
