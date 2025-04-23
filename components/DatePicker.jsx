"use client";

import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays, isSaturday, isSunday, startOfTomorrow } from "date-fns";
import { FormItem } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { is } from "date-fns/locale";

const DatePicker = ({
  onDateChange,
  onWeekendRuleChange,
  onSelectedDaysChange,
  isTrial,
}) => {
  const loadSavedData = () => {
    try {
      const savedFormData = localStorage.getItem("mealFormData");
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);

        // Initialize with saved values when available
        const initialStartDate =
          parsedData.highlightedDates && parsedData.highlightedDates.length > 0
            ? new Date(parsedData.highlightedDates[0])
            : null;

        const initialSelectedDays = parsedData.selectedDuration || null;
        const initialWeekendRule = parsedData.weekendType || "all";

        return {
          startDate: initialStartDate,
          selectedDays: initialSelectedDays,
          saturdayOption: initialWeekendRule,
        };
      }
    } catch (error) {
      console.error("Error loading saved form data:", error);
    }

    // Default values if nothing in localStorage
    return {
      startDate: null,
      selectedDays: null,
      saturdayOption: "all",
    };
  };
  // Get initial values
  const initialValues = loadSavedData();

  // Initialize state with loaded values
  const [startDate, setStartDate] = useState(initialValues.startDate);
  const [selectedDays, setSelectedDays] = useState(initialValues.selectedDays);
  const [saturdayOption, setSaturdayOption] = useState(
    initialValues.saturdayOption
  );
  const [excludedDates, setExcludedDates] = useState([]);
  const [hasUserSelected, setHasUserSelected] = useState(
    !!initialValues.startDate
  );
  const [holidayDates, setHolidayDates] = useState([]);

  useEffect(() => {
    // Only generate dates if user has made a selection
    if (startDate && selectedDays !== null) {
      generateHighlightedDates(startDate, selectedDays, saturdayOption);
    } else {
      // Clear any dates if no start date or selectedDays is not set
      if (onDateChange) {
        onDateChange([]);
      }
    }
  }, [startDate, selectedDays, saturdayOption]);

  useEffect(() => {
    if (startDate && selectedDays !== null) {
      const normalizedStart = new Date(startDate);
      normalizedStart.setHours(0, 0, 0, 0);

      const normalizedEnd = new Date(
        addDays(normalizedStart, selectedDays - 1)
      );
      normalizedEnd.setHours(0, 0, 0, 0);

      onDateChange({ startDate: normalizedStart, endDate: normalizedEnd });

      if (onSelectedDaysChange) {
        onSelectedDaysChange(selectedDays);
      }
    } else if (onSelectedDaysChange) {
      onSelectedDaysChange(selectedDays);
    }
  }, [startDate, selectedDays, onDateChange, onSelectedDaysChange]);

  useEffect(() => {
    async function fetchHolidays() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/holidays/list`
        );
        const json = await res.json();

        if (json.success && Array.isArray(json.holidays)) {
          const holidays = json.holidays.map((item) => {
            const date = new Date(item.date);
            date.setHours(0, 0, 0, 0);
            return date;
          });

          setHolidayDates(holidays);
        }
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
      }
    }

    fetchHolidays();
  }, []);

  const generateHighlightedDates = (start, days, saturdayRule) => {
    const validDates = [];
    const greyedOutDates = [];

    if (!start || !days) {
      onDateChange([]);
      return;
    }

    const startCopy = new Date(start);
    startCopy.setHours(12, 0, 0, 0); // Avoid timezone shifts

    for (let i = 0; i < days; i++) {
      const newDate = addDays(startCopy, i);
      newDate.setHours(12, 0, 0, 0);

      if (isSunday(newDate)) {
        greyedOutDates.push(new Date(newDate));
        continue;
      }

      if (isSaturday(newDate)) {
        const weekNumber = Math.floor((newDate.getDate() - 1) / 7) + 1;

        if (
          saturdayRule === "none" ||
          (saturdayRule === "odd" && ![1, 3].includes(weekNumber)) ||
          (saturdayRule === "even" && ![2, 4].includes(weekNumber))
        ) {
          greyedOutDates.push(new Date(newDate));
          continue;
        }
      }

      const isHoliday = holidayDates.some(
        (holiday) =>
          holiday.getFullYear() === newDate.getFullYear() &&
          holiday.getMonth() === newDate.getMonth() &&
          holiday.getDate() === newDate.getDate()
      );

      if (isHoliday) {
        greyedOutDates.push(new Date(newDate));
        continue;
      }

      validDates.push(new Date(newDate));
    }

    // 🚫 No formatting to string here
    onDateChange(validDates);
    setExcludedDates(greyedOutDates);
  };

  const handleSelect = (ranges) => {
    const selectedStartDate = new Date(ranges.selection.startDate);
    selectedStartDate.setHours(0, 0, 0, 0); // Normalize to local midnight

    setStartDate(selectedStartDate);
    setHasUserSelected(true);
  };

  return (
    <div className="relative flex flex-col items-start">
      <div className="relative shadow-lg flex justify-center flex-col rounded-lg z-10">
        <div className="mb-3 max-w-[90%] flex gap-4">
          {!isTrial && (
            <RadioGroup
              value={selectedDays?.toString() || ""}
              onValueChange={(value) => {
                setSelectedDays(parseInt(value));
                // Re-trigger date calculation if user has already selected a date
                if (startDate) {
                  setTimeout(
                    () =>
                      generateHighlightedDates(
                        startDate,
                        parseInt(value),
                        saturdayOption
                      ),
                    0
                  );
                }
              }}
              className="flex gap-4 w-full"
            >
              <FormItem className="flex-1 m-0 p-0 space-y-0">
                <div className="relative w-full">
                  <RadioGroupItem value="7" id="days7" className="sr-only" />
                  <label
                    htmlFor="days7"
                    className={`flex justify-center items-center text-xl h-15 w-full rounded-md border-2 cursor-pointer transition-all
                    ${
                      selectedDays === 7
                        ? "bg-[#e6af55] text-white border-gray-100"
                        : "border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                    }`}
                  >
                    1 Week
                  </label>
                </div>
              </FormItem>

              <FormItem className="flex-1 m-0 p-0 space-y-0">
                <div className="relative w-full">
                  <RadioGroupItem value="30" id="days30" className="sr-only" />
                  <label
                    htmlFor="days30"
                    className={`flex justify-center items-center text-xl h-15 w-full rounded-md border-2 cursor-pointer transition-all
                    ${
                      selectedDays === 30
                        ? "bg-[#e6af55] text-white border-gray-100"
                        : "border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                    }`}
                  >
                    1 Month
                  </label>
                </div>
              </FormItem>
            </RadioGroup>
          )}
        </div>

        {!isTrial && (
          <div className="mb-3 max-w-[90%] md:w-full">
            <Select
              value={saturdayOption}
              onValueChange={(value) => {
                setSaturdayOption(value);
                onWeekendRuleChange?.(value);
                if (startDate) {
                  setTimeout(
                    () =>
                      generateHighlightedDates(startDate, selectedDays, value),
                    0
                  );
                }
              }}
              className="border-0"
            >
              <label
                htmlFor="weekendSelect"
                className="primary-font font-medium block mb-1"
              >
                Weekends Type
              </label>
              <SelectTrigger className="border-2 p-2 text-xl h-14! bg-[#e6af55] text-white rounded-md max-w-full w-[365px]">
                <SelectValue placeholder="Select Saturdays secondary-font font-xl" />
              </SelectTrigger>
              <SelectContent className="rounded-lg bg-white text-black shadow-lg">
                <SelectItem
                  value="all"
                  className="hover:bg-[#03141c] secondary-font font-xl hover:text-white px-3 py-2 cursor-pointer rounded-md transition-colors"
                >
                  All Saturdays
                </SelectItem>
                <SelectItem
                  value="none"
                  className="hover:bg-[#03141c] secondary-font font-xl hover:text-white px-3 py-2 cursor-pointer rounded-md transition-colors"
                >
                  No Saturdays
                </SelectItem>
                <SelectItem
                  value="odd"
                  className="hover:bg-[#03141c] secondary-font font-xl hover:text-white px-3 py-2 cursor-pointer rounded-md transition-colors"
                >
                  1st & 3rd Saturdays
                </SelectItem>
                <SelectItem
                  value="even"
                  className="hover:bg-[#03141c] secondary-font font-xl hover:text-white px-3 py-2 cursor-pointer rounded-md transition-colors"
                >
                  2nd & 4th Saturdays
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <DateRange
          ranges={[
            {
              startDate: startDate || new Date(),
              endDate: isTrial
                ? startDate || new Date()
                : startDate
                ? addDays(startDate, selectedDays - 1)
                : new Date(),
              key: "selection",
            },
          ]}
          className="rounded-lg"
          onChange={(ranges) => {
            const selectedStartDate = new Date(ranges.selection.startDate);
            selectedStartDate.setHours(0, 0, 0, 0); // Normalize

            if (isTrial) {
              // For trial → only one date
              setStartDate(selectedStartDate);
              setHasUserSelected(true);
              onDateChange([
                { startDate: selectedStartDate, endDate: selectedStartDate },
              ]);
            } else {
              // For non-trial → normal behavior
              setStartDate(selectedStartDate);
              setHasUserSelected(true);
            }
          }}
          minDate={addDays(startOfTomorrow(), 1)}
          moveRangeOnFirstSelection={false}
          rangeColors={["#e6af55"]}
          disabledDates={excludedDates}
          showSelectionPreview={true}
          months={1}
          direction="vertical"
        />
      </div>
    </div>
  );
};

export default DatePicker;
