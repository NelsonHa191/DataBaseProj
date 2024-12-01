import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { connectBankAction } from "../actions/actions";
  import { Label } from "@/components/ui/label";
  import { SubmitButton } from "@/components/submit-button";

export default async function ConnectBankDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Connect bank</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect your banking account</DialogTitle>
          <DialogDescription>
            Enter your bank account information here. Click connect bank when
            you're finished.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col min-w-64 max-w-64 mx-auto">
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="routing">Routing</Label>
            <Input name="routing" placeholder="123456789" required />
            <Label htmlFor="institution">Bank institution</Label>
            <Input
              name="institution"
              placeholder="Wells Fargo, Chase, etc."
              required
            />
            <Label htmlFor="type">Account type</Label>
            <Input name="type" placeholder="Checking, Savings..." required />

            <DialogFooter>
              <SubmitButton
                formAction={connectBankAction}
                pendingText="Signing up..."
              >
                Connect
              </SubmitButton>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
