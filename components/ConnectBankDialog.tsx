"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDemo } from "@/components/DemoProvider";

export default function ConnectBankDialog({ redirectTo }: { redirectTo?: string }) {
  const { connectBank } = useDemo();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    connectBank({
      institution: String(form.get("institution")),
      routing: String(form.get("routing")),
      type: String(form.get("type")),
    });
    setOpen(false);
    if (redirectTo) router.push(redirectTo);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Connect bank</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect your banking account</DialogTitle>
          <DialogDescription>
            This is a demo — use made-up details. A random starting balance will
            be assigned.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col min-w-64 max-w-64 mx-auto">
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="routing">Routing</Label>
            <Input id="routing" name="routing" placeholder="123456789" required />
            <Label htmlFor="institution">Bank institution</Label>
            <Input id="institution" name="institution" placeholder="Wells Fargo, Chase, etc." required />
            <Label htmlFor="type">Account type</Label>
            <Input id="type" name="type" placeholder="Checking, Savings..." required />
            <DialogFooter>
              <Button type="submit">Connect</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
