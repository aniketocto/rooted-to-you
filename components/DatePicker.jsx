"use client";

import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays, isSaturday, isSunday, startOfTomorrow } from "date-fns";
import { FormItem } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const DatePicker = ({
  onDateChange,
  onWeekendRuleChange,
  onSelectedDaysChange,
}) => {
  // Initialize selectedDays as null to not have any default radio option selected
  const [startDate, setStartDate] = useState(null);
  const [selectedDays, setSelectedDays] = useState(null); // no default selected day
  const [saturdayOption, setSaturdayOption] = useState("all");
  const [excludedDates, setExcludedDates] = useState([]);
  const [hasUserSelected, setHasUserSelected] = useState(false);

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

  const generateHighlightedDates = (start, days, saturdayRule) => {
    const validDates = [];
    const greyedOutDates = [];

    for (let i = 0; i < days; i++) {
      const newDate = addDays(start, i);

      if (isSunday(newDate)) {
        greyedOutDates.push(newDate);
        continue;
      }

      if (isSaturday(newDate)) {
        const weekNumber = Math.floor((newDate.getDate() - 1) / 7) + 1;

        if (
          saturdayRule === "none" ||
          (saturdayRule === "odd" && ![1, 3].includes(weekNumber)) ||
          (saturdayRule === "even" && ![2, 4].includes(weekNumber))
        ) {
          greyedOutDates.push(newDate);
          continue;
        }
      }

      validDates.push(newDate);
    }

    if (onDateChange) {
      onDateChange(validDates);
    }
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
      <div className="relative shadow-lg rounded-lg z-10">
        <div className="mb-3 flex gap-4">
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
                  className={`flex justify-center items-center h-12 w-full rounded-md border-2 cursor-pointer transition-all
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
                  className={`flex justify-center items-center h-12 w-full rounded-md border-2 cursor-pointer transition-all
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
        </div>

        <div className="mb-3 md:w-full w-[300px] ">
          <label htmlFor="weekendSelect" className="font-medium block mb-1">
            Weekends Type
          </label>
          <select
            id="weekendSelect"
            value={saturdayOption}
            onChange={(e) => {
              setSaturdayOption(e.target.value);
              if (onWeekendRuleChange) {
                onWeekendRuleChange(e.target.value);
              }
              if (startDate) {
                setTimeout(
                  () =>
                    generateHighlightedDates(
                      startDate,
                      selectedDays,
                      e.target.value
                    ),
                  0
                );
              }
            }}
            className="border p-2 bg-[#03141c] rounded-lg w-full"
          >
            <option value="all">All Saturdays</option>
            <option value="none">No Saturdays</option>
            <option value="odd">1st & 3rd Saturdays</option>
            <option value="even">2nd & 4th Saturdays</option>
          </select>
        </div>

        <DateRange
          ranges={[{
            startDate: startDate || new Date(),
            endDate: startDate ? addDays(startDate, selectedDays - 1) : new Date(),
            key: "selection",
          }]}
          className="rounded-lg"
          onChange={handleSelect}
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
