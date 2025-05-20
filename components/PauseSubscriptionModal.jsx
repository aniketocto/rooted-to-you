"use client";

import { useEffect, useState } from "react";
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
import { apiFetch } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { ro } from "date-fns/locale";

export default function PauseSubscriptionModal({
  activeSubscription,
  customerId,
  subsId,
  token,
}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popopen, setPopOpen] = useState(false);
  const [pausedDates, setPausedDates] = useState([]);

  const now = new Date();
  const hour = now.getHours();

  const highlightedDates =
    activeSubscription.selectedDates?.map((dateStr) => parseISO(dateStr)) || [];

  const defaultMonth = highlightedDates?.[0] || new Date();
  useEffect(() => {
    if (!Array.isArray(subsId) || subsId.length === 0) return;

    const fetchPaused = async () => {
      try {
        const allPausedDates = [];

        for (const id of subsId) {
          const res = await apiFetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/orders/paused/${id}`
          );
          if (!res.ok)
            throw new Error(`Failed to load paused dates for ID: ${id}`);
          const data = await res.json();
          const dates = data.pausedDates.map((d) => new Date(d));
          allPausedDates.push(...dates);
        }

        // Remove duplicates if needed
        const uniqueDates = Array.from(
          new Set(allPausedDates.map((d) => d.toISOString()))
        ).map((iso) => new Date(iso));

        setPausedDates(uniqueDates);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPaused();
  }, [subsId]);

  // console.log("Paused dates:", pausedDates);

  // Disable anything not in subscription dates OR violating 1-day-before + 4pm rule
  const isDisabled = (date) => {
    const isPaused = pausedDates.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );
    if (isPaused) return true;

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
    const isTomorrow = differenceInCalendarDays(date, now) === 1 && hour >= 16;

    return isTomorrow;
  };

  const handlePause = async () => {
    if (!selectedDate) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/orders/pause`,
        {
          method: "POST", // add method if you’re sending a body
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ← send the token
          },
          body: JSON.stringify({
            subscriptionId: activeSubscription.id,
            pauseDate: format(selectedDate, "yyyy-MM-dd"),
            customerId,
          }),
        }
      );

      // ────────── inspect response once ──────────
      const data = res.headers.get("content-type")?.includes("application/json")
        ? await res.json().catch(() => ({}))
        : {};

      console.log("Pause response:", res.ok);

      if (res.status === 401) {
        router.push("/register");
        return;
      }

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      /* ───── success ───── */
      const prettyDate = format(selectedDate, "EEE, MMM d, yyyy");
      setOpen(false);
      setSelectedDate(null);
      setPopOpen(true);
      setError(`We have paused your meals for ${prettyDate}.`);
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
        className="bg-amber-500 text-white p-1 md:p-5 rounded-md hover:bg-amber-600"
        onClick={() => setOpen(true)}
      >
        Pause
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] max-w-md sm:max-w-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl! text-left w-full font-semibold text-white">
              Select a Pause Date
            </DialogTitle>
          </DialogHeader>

          {/* ✅ Note Message */}
          <div className="md:text-sm text-[10px] text-white text-left w-full mb-2">
            Note: Each pause must be done separately, before 4:00 PM, a
            day prior.
          </div>

          <div className="py-4 flex flex-col items-center calender-size">
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
              className="rounded-md  w-[100%] dark:bg-transparent text-white"
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

          <DialogFooter className="flex justify-between w-1/2 md:w-fun">
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="border-gray-300 text-white hover:bg-white/10 "
            >
              Cancel
            </Button>
            <Button
              onClick={handlePause}
              disabled={isSelectionInvalid || loading}
              className="bg-amber-500 hover:bg-amber-600 text-white "
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
