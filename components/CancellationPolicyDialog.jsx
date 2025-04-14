import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CancellationPolicyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Cancellation Policy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancellation Policy</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <p className="text-xl primary-font text-justify">
            To intimate Us about the cancellation of the subscription Service
            for any other reason post the time period provided in this Section
            above, You will be required to email Us at info@rootedtoyou.com.
            Upon cancellation, the remainder, post deductions, if any, will be
            refunded to You, on a case to case basis after due investigation, to
            the same account from which the payment was made in accordance with
            the formula provided hereunder: Total Subscription Amount (before
            GST) (÷) 26 subscriptions days) (–) the number of used service days
            (=) Refund Amount.
          </p>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
