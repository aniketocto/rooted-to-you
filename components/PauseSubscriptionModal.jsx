"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import {
  format,
  parseISO,
  isBefore,
  isAfter,
  addDays,
  isEqual,
  differenceInCalendarDays,
} from "date-fns";
import AlertBox from "./AlertBox";

export default function PauseSubscriptionModal({
  activeSubscription,
  customerId,
}) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popopen, setPopOpen] = useState(false);

  const now = new Date();
  const hour = now.getHours();

  const highlightedDates =
    activeSubscription.selectedDates?.map((dateStr) => parseISO(dateStr)) || [];

  const defaultMonth = highlightedDates?.[0] || new Date();

console.log("Props", activeSubscription, customerId)

  // Disable anything not in subscription dates OR violating 1-day-before + 4pm rule
  const isDisabled = (date) => {
    const isValidSubDate = highlightedDates.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );

    if (!isValidSubDate) return true;

    // Don't allow user to pause *today's date* or past
    if (differenceInCalendarDays(date, now) <= 0) return true;

    // If selected date is tomorrow and current time is after 4 PM — disable
    const isTomorrow =
      differenceInCalendarDays(date, now) === 1 && hour >= 16;

    return isTomorrow;
  };

  const handlePause = async () => {
    if (!selectedDate) return;

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/orders/pause`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subscriptionId: activeSubscription.id,
            pauseDate: format(selectedDate, "yyyy-MM-dd"),
            customerId,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setOpen(false);
        setSelectedDate(null);
        setPopOpen(true)
        setError("We have pause for that day")
      } else {
        setError( "Something went wrong.");
      }
    } catch (err) {
      console.error("Pause error:", err);
      setError("Error while pausing subscription.");
    } finally {
      setLoading(false);
    }
  };

  const isSelectionInvalid =
    !selectedDate ||
    (differenceInCalendarDays(selectedDate, now) === 1 && hour >= 16);

  return (
    <>
      <Button
        className="bg-amber-500 text-white p-5 rounded-md hover:bg-amber-600"
        onClick={() => setOpen(true)}
      >
        Pause
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md w-full backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-semibold text-white">
              Select a Pause Date
            </DialogTitle>
          </DialogHeader>

          {/* ✅ Note Message */}
          <div className="text-sm text-white text-center mb-2 px-4">
            Please note: You can only pause a date by 4:00 PM on the day before.
          </div>

          <div className="py-4 flex flex-col items-center">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={defaultMonth}
              fromMonth={highlightedDates[0]}
              toMonth={highlightedDates[highlightedDates.length - 1]}
              modifiers={{
                highlighted: highlightedDates,
              }}
              disabled={isDisabled}
              
              styles={{
                day: { margin: "0.2em" },
                caption: { color: "#fff" },
                head_cell: { color: "#ddd" },
              }}
              className="rounded-md p-2 dark:bg-transparent text-white"
            />

            {selectedDate && (
              <div className="mt-4 text-center text-sm text-white">
                Your subscription will be paused on:{" "}
                <span className="font-medium">
                  {format(selectedDate, "MMMM d, yyyy")}
                </span>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between">
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="border-gray-300 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePause}
              disabled={isSelectionInvalid || loading}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              {loading ? "Processing..." : "Confirm Pause"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertBox open={popopen} setOpen={setPopOpen} description={error} />
    </>
  );
}
